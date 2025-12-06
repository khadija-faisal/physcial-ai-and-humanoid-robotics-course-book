---
title: "Week 5: URDF Robot Description"
learning_outcomes:
  - Understand URDF (Unified Robot Description Format) syntax
  - Learn how to describe robot structure, links, and joints
  - Practice creating and validating URDF files
week_number: 5
module_number: 2
proficiency_level: ["Beginner", "Intermediate", "Advanced"]
prerequisites: []
tags: ["ros2", "urdf", "robot-description", "xml"]
authors: ["Instructor"]
last_updated: "2025-12-07"
---

# Week 5: URDF Robot Description

## Overview

URDF (Unified Robot Description Format) is an XML format that describes the structure of a robot, including its links (rigid bodies) and joints (connections between links).

## Learning Outcomes

By the end of this chapter, you will:
- Understand URDF (Unified Robot Description Format) syntax
- Learn how to describe robot structure, links, and joints
- Practice creating and validating URDF files

## What is URDF?

URDF is an XML-based format that defines:
- **Links**: Rigid bodies (arms, legs, base)
- **Joints**: Connections between links (revolute, prismatic)
- **Collision geometry**: For collision detection
- **Visual geometry**: For visualization in RViz

## URDF Structure

A basic URDF file looks like:

```xml
<?xml version="1.0" ?>
<robot name="my_robot">
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.5 0.5"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.5 0.5"/>
      </geometry>
    </collision>
  </link>

  <link name="arm_link">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.5"/>
      </geometry>
    </visual>
  </link>

  <joint name="base_to_arm" type="revolute">
    <parent link="base_link"/>
    <child link="arm_link"/>
    <axis xyz="0 0 1"/>
    <limit lower="0" upper="3.14" effort="10" velocity="1"/>
  </joint>
</robot>
```

## Key Components

- **Links**: Define the physical structure
- **Joints**: Define how links connect and move
- **Frames**: Coordinate systems attached to links
- **Properties**: Mass, inertia, visual/collision properties

## Next Steps

With URDF mastered, you're ready to learn about simulation in Gazebo. Proceed to Module 3.
