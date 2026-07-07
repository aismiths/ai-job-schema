#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

// Minimal validation — checks required fields and known enum values.
// For full JSON Schema validation: npm install ajv && ajv validate -s schema/job.v1.json -d your-job.json

const [,, command, filePath] = process.argv

if (command !== 'validate' || !filePath) {
  console.log('Usage: npx ai-job-schema validate <job.json>')
  console.log('       npx ai-job-schema validate examples/auth-rescue.json')
  process.exit(1)
}

let job
try {
  job = JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf8'))
} catch (e) {
  console.error(`Error reading ${filePath}: ${e.message}`)
  process.exit(1)
}

const errors = []

if (job.version !== '1') errors.push('version must be "1"')
if (!job.problem_type) errors.push('problem_type is required')
if (!job.stack?.framework) errors.push('stack.framework is required')

const validProblemTypes = ['auth-rescue','payment-fix','security-audit','deploy-fix','performance-fix','database-fix','full-rescue','bug-sweep','other']
if (job.problem_type && !validProblemTypes.includes(job.problem_type)) {
  errors.push(`problem_type "${job.problem_type}" is not valid. Must be one of: ${validProblemTypes.join(', ')}`)
}

const validFrameworks = ['next.js','remix','sveltekit','nuxt','astro','express','fastapi','other']
if (job.stack?.framework && !validFrameworks.includes(job.stack.framework)) {
  errors.push(`stack.framework "${job.stack.framework}" is not valid. Must be one of: ${validFrameworks.join(', ')}`)
}

if (errors.length > 0) {
  console.error('❌ Invalid job schema:')
  errors.forEach(e => console.error(`  - ${e}`))
  process.exit(1)
} else {
  console.log('✅ Valid AI Rescue Job schema (v1)')
  console.log(`   problem_type: ${job.problem_type}`)
  console.log(`   platform:     ${job.platform ?? 'not specified'}`)
  console.log(`   stack:        ${job.stack.framework}${job.stack.auth ? ' + ' + job.stack.auth : ''}`)
  if (job.context?.smith_check_score !== undefined) {
    console.log(`   smith-check:  ${job.context.smith_check_score}/100`)
  }
  if (job.urgency) console.log(`   urgency:      ${job.urgency}`)
  if (job.budget_range?.min || job.budget_range?.max) {
    const { min, max, currency } = job.budget_range
    console.log(`   budget:       ${min ? `$${min}` : '?'} – ${max ? `$${max}` : '?'} ${currency}`)
  }
}
