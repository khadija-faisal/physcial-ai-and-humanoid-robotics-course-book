---
title: "Week 3: ROS 2 Nodes & Topics"
learning_outcomes:
  - Understand ROS 2 architecture and the publisher-subscriber model
  - Learn how to create and manage nodes in ROS 2
  - Practice publishing and subscribing to topics
week_number: 3
module_number: 2
proficiency_level: ["Beginner", "Intermediate", "Advanced"]
prerequisites: []
tags: ["ros2", "nodes", "topics", "communication"]
authors: ["Instructor"]
last_updated: "2025-12-07"
---

# Week 3: ROS 2 Nodes & Topics

## Overview

ROS 2 (Robot Operating System 2) is the middleware that enables communication between robot components. This chapter introduces the core concepts: nodes (processes) and topics (communication channels).

## Learning Outcomes

By the end of this chapter, you will:
- Understand ROS 2 architecture and the publisher-subscriber model
- Learn how to create and manage nodes in ROS 2
- Practice publishing and subscribing to topics

## ROS 2 Architecture

ROS 2 uses a **distributed, middleware-agnostic approach** where:
- Each robot component is a **node** (independent process)
- Nodes communicate through **topics** (one-to-many messaging)
- The **DDS (Data Distribution Service)** middleware handles networking

## Nodes

A **node** is an executable that performs a specific task. Examples include:
- Sensor drivers (reading LIDAR data)
- Controllers (commanding motors)
- Planners (path planning)
- Visualizers (displaying debug information)

### Creating a Simple Node

Nodes are typically written in Python or C++.

```python
import rclpy
from rclpy.node import Node

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello ROS 2!'
        self.publisher_.publish(msg)
```

## Topics

A **topic** is a named communication channel. Publishers send messages to a topic, and subscribers receive them.

### Topic Structure

```
/lidar_points (topic)
  ├── Publisher: sensor_driver_node
  └── Subscribers:
      ├── navigation_node
      ├── visualization_node
```

## Next Steps

With nodes and topics understood, you're ready to learn about ROS 2 services in the next chapter.
