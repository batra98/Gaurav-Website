---
date: '2025-01-20'
title: 'Deduplication Pipeline & Multi-GPU LLM Fine-Tuning'
github: ''
external: ''
tech:
  - Python
  - PyTorch
  - Hugging Face
  - Multi-GPU Training
  - MinHash
company: 'UW-Madison'
showInProjects: true
---

Developed a high-throughput **deduplication pipeline** using conventional hashing and MinHash to eliminate exact and near-duplicates from over **10M documents** across GitHub and Common Crawl sources. Built a **multi-GPU fine-tuning pipeline** with Hugging Face Accelerate and Transformers to efficiently fine-tune LLMs featuring optimized I/O, cluster-level parallelism, checkpointing, and reproducible W&B logging.