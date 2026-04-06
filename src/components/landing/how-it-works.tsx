'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Choose a template',
    description: 'Browse 30+ professionally designed templates for blogs, products, events, and more.',
    color: 'from-cyan-500 to-cyan-400',
  },
  {
    number: '02',
    title: 'Customize everything',
    description: 'Edit text, colors, fonts, and images. See changes in real-time with the live preview.',
    color: 'from-violet-500 to-violet-400',
  },
  {
    number: '03',
    title: 'Export & ship',
    description: 'Download as PNG, JPEG, or WebP. Or use the API to automate generation at scale.',
    color: 'from-fuchsia-500 to-fuchsia-400',
  },
]

export function HowItWorks() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold text-violet-400 tracking-wider uppercase mb-4">
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Three steps to{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              beautiful images
            </span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-start gap-8 glass-card rounded-2xl p-8"
            >
              <span className={`text-5xl font-extrabold bg-gradient-to-b ${step.color} bg-clip-text text-transparent shrink-0`}>
                {step.number}
              </span>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
