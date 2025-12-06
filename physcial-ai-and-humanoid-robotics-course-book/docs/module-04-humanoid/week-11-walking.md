---
title: "Week 11: Bipedal Locomotion"
learning_outcomes:
  - Understand bipedal locomotion mechanics and stability
  - Learn control strategies for humanoid walking
  - Practice implementing gait algorithms
week_number: 11
module_number: 4
proficiency_level: ["Beginner", "Intermediate", "Advanced"]
prerequisites: []
tags: ["humanoid", "locomotion", "gait", "bipedal", "control"]
authors: ["Instructor"]
last_updated: "2025-12-07"
---

# Week 11: Bipedal Locomotion

## Overview

Bipedal locomotion is one of the most complex challenges in humanoid robotics. This chapter covers the mechanics of walking, stability principles, and control strategies.

## Learning Outcomes

By the end of this chapter, you will:
- Understand bipedal locomotion mechanics and stability
- Learn control strategies for humanoid walking
- Practice implementing gait algorithms

## Fundamentals of Bipedal Walking

Walking involves:
1. **Stance Phase**: One leg supports the body
2. **Swing Phase**: The other leg swings forward
3. **Double Support**: Brief moment when both feet are on the ground

### Center of Mass (CoM)

The Center of Mass must remain within the **support polygon** for stability:
- Single stance: CoM over one foot
- Double stance: CoM between both feet

## Control Strategies

### 1. Zero Moment Point (ZMP)

The ZMP is the point where the total moment of force equals zero. For stable walking, the ZMP must stay within the support polygon.

**ZMP Criterion**:
```
If ZMP is inside support polygon → Stable
If ZMP is outside support polygon → Falling
```

### 2. Inverse Kinematics

Humanoids use inverse kinematics to compute joint angles from desired foot positions:

```python
# Pseudocode for IK
desired_foot_position = [x, y, z]
joint_angles = solve_ik(desired_foot_position, leg_chain)
```

## Gaits

Different walking patterns:
- **Walking**: Natural, energy-efficient gait
- **Running**: Both feet leave ground
- **Trotting**: Diagonal legs move together (quadrupeds)

## Challenges

- **Balance**: Maintaining stability during acceleration
- **Energy**: Minimizing power consumption
- **Speed**: Trade-off between efficiency and speed
- **Terrain**: Adapting to uneven ground

## Next Steps

With locomotion mastered, you're ready for the capstone project!
