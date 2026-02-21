# CampusPulse AI

Data to Prevention: AI as Your Health Partner for Students

## Overview

CampusPulse AI is a predictive burnout prevention system designed specifically for students to maintain better academic performance.
Unlike traditional wellness trackers that monitor daily habits, CampusPulse AI analyzes multi-day behavioral trends to detect early instability patterns and intervene before burnout escalates.
The system focuses on forecasting risk and enabling early preventive action to protect both student well-being and academic outcomes.

## Problem

Student burnout does not occur suddenly.
It builds gradually through:

* Rising stress
* Declining sleep
* Increasing academic workload
* Mood instability
* Poor nutrition habits

When unmanaged, these factors lead to decreased concentration, lower productivity, missed deadlines, and declining academic performance.
Most students recognize burnout only after significant academic impact has already occurred.
There is currently no lightweight, structured system that continuously models behavioral drift and predicts burnout risk early enough to preserve academic stability.

## Solution

CampusPulse AI uses structured daily check-ins and trend analysis to compute a dynamic Behavioral Stability Score that directly supports academic performance.

The system:

1. Collects 1 to 5 scaled daily inputs:

   * Stress
   * Sleep
   * Mood
   * Academic workload
   * Nutrition

2. Normalizes values to a 0 to 1 scale.

3. Calculates multi-day behavioral trends.

4. Generates a weighted Risk Score.

5. Predicts a Burnout Risk Window:

   * Low Risk
   * Moderate Risk
   * High Risk

6. Triggers targeted micro-interventions designed to restore balance and prevent academic decline.

## AI Model Architecture

CampusPulse AI uses a deterministic predictive model optimized for clarity and speed.

### Step 1: Normalization

All 1 to 5 inputs are converted to a 0 to 1 scale:

normalized = (value - 1) / 4

### Step 2: Trend Analysis

Short-term behavioral velocity is computed as:

trend = today_value - average(last_3_days)

An increasing stress or workload trend raises risk.
A declining sleep trend raises risk.
Mood volatility contributes to instability scoring.

### Step 3: Weighted Risk Model

Risk Score =
(0.30 × Stress Trend) +
(0.25 × Sleep Decline Rate) +
(0.20 × Workload Intensity) +
(0.15 × Mood Volatility) +
(0.10 × Nutrition Instability)

The final score maps to:

* 0.00 to 0.39  → Low Risk
* 0.40 to 0.69  → Moderate Risk
* 0.70 to 1.00  → High Risk

This enables preventive intervention before burnout negatively impacts academic performance.

## Core Features

* Daily 1 to 5 Behavioral Check-In
* Behavioral Stability Score
* Burnout Risk Window Prediction
* Targeted Micro-Interventions
* Weekly Trend Visualization
* Academic Deadline Logging
* Preventive Health Insights

## Why It Matters

CampusPulse AI transforms passive tracking into active prevention.

By detecting instability windows early, students receive:

* Actionable insights
* Targeted preventive actions
* Early warnings before performance decline

The result is improved consistency, healthier study patterns, and stronger academic performance over time.

## Tech Stack

* Frontend: React Native
* Backend: Firebase Firestore
* Authentication: Firebase Auth
* Data Modeling: Structured daily logs
* AI Engine: Rule-based weighted predictive model

## Future Improvements

* Adaptive weight tuning based on user history
* Real-time wearable integration
* Dataset-backed calibration
* Machine learning refinement
* Institutional dashboard for campus-wide academic performance analytics

planation so it sounds even more technically sophisticated without making it harder to build.

