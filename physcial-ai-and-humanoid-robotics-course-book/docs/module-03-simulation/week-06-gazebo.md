---
title: "Week 6: Gazebo Physics"
learning_outcomes:
  - Understand Gazebo simulator and physics engines
  - Learn to configure and run simulations
  - Practice debugging simulations and interpreting results
week_number: 6
module_number: 3
proficiency_level: ["Beginner", "Intermediate", "Advanced"]
prerequisites: []
tags: ["gazebo", "physics-simulation", "robotics", "simulation"]
authors: ["Instructor"]
last_updated: "2025-12-07"
---

# Week 6: Gazebo Physics

## Overview

Gazebo is a powerful open-source robot simulator that provides physics simulation, sensor simulation, and visualization. This chapter explores how Gazebo simulates physical interactions.

## Learning Outcomes

By the end of this chapter, you will:
- Understand Gazebo simulator and physics engines
- Learn to configure and run simulations
- Practice debugging simulations and interpreting results

## Introduction to Gazebo

Gazebo provides:
- **Physics Simulation**: Realistic physics with multiple engine support
- **Sensor Simulation**: Simulated LIDAR, cameras, IMU
- **Visualization**: 3D viewing of the simulation
- **ROS 2 Integration**: Direct communication with ROS 2 nodes

## Physics Engines

Gazebo supports multiple physics engines:
- **ODE (Open Dynamics Engine)**: Default, good for general-purpose simulation
- **Bullet**: High-speed collision detection
- **DART**: Detailed dynamics
- **Simbody**: Advanced biomechanics

### Configuring Physics

Physics parameters in Gazebo world files:

```xml
<physics type="ode">
  <max_step_size>0.001</max_step_size>
  <real_time_factor>1</real_time_factor>
  <ode>
    <solver type="quick"/>
    <constraints>
      <cfm>0</cfm>
      <erp>0.2</erp>
    </constraints>
  </ode>
</physics>
```

## Simulation Basics

1. **Load a robot** (URDF/SDF)
2. **Set up sensors** (camera, LIDAR)
3. **Configure physics** (gravity, friction)
4. **Run the simulation**
5. **Interact** via ROS 2 topics

## Common Issues and Debugging

- **Robot falling through ground**: Check collision geometry
- **Unstable behavior**: Reduce step size or adjust friction
- **Sensor not publishing**: Verify plugin configuration

## Next Steps

With Gazebo mastered, you're ready to explore NVIDIA Isaac Sim for more advanced simulations.
