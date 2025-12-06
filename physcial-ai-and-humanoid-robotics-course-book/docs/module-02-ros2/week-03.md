---
title: "Weeks 3-5: ROS 2 Fundamentals"
learning_outcomes:
  - Master ROS 2 architecture and core concepts
  - Build ROS 2 packages with Python
  - Understand nodes, topics, services, and actions
  - Work with launch files and parameter management
week_number: 3
module_number: 2
proficiency_level: ["Beginner", "Intermediate", "Advanced"]
prerequisites: []
tags: ["ros2", "middleware", "distributed-systems", "python", "robotics"]
authors: ["Panaversity"]
last_updated: "2025-12-07"
---

# Weeks 3-5: ROS 2 Fundamentals

## Overview

ROS 2 (Robot Operating System 2) is the middleware that enables communication between robot components. Unlike monolithic systems, ROS 2 uses a distributed architecture where each robot component is a **node**—an independent process that communicates with other nodes through **topics** (one-to-many messaging) and **services** (request-reply patterns).

## ROS 2 Architecture

ROS 2 provides:
- **Middleware Abstraction**: Works with multiple DDS (Data Distribution Service) implementations
- **Python Support**: Easy development with rclpy library
- **Type Safety**: Messages defined in .msg files
- **Distributed Communication**: Nodes can run on different machines
- **Parameter Server**: Centralized configuration management

## Core Concepts

### Nodes

A **node** is an independent process that performs a specific task. Nodes communicate through topics and services.

**Example Node Types:**
- **Sensor Driver**: Reads data from hardware (e.g., LIDAR node)
- **Controller**: Computes robot actions (e.g., motion planner node)
- **Perception**: Processes sensor data (e.g., vision processing node)
- **Aggregator**: Collects and logs data

### Topics

A **topic** is a named channel for one-way communication. Publishers send messages to topics; subscribers listen for messages.

**Topic Communication:**
```
Publisher Node → Topic ← Subscriber Node 1
                    ↑
                    └── Subscriber Node 2
```

**Example:**
- A LIDAR driver publishes point clouds to `/lidar_points`
- A navigation node subscribes to `/lidar_points` for path planning
- A visualization node also subscribes to show the point cloud in 3D

### Services

A **service** is a request-reply pattern for synchronous communication. A service server responds to requests from service clients.

**Service Communication:**
```
Client Node → Request → Service Server
               ← Response ←
```

**Example:**
- A motion planning node offers a service `/plan_path`
- When a control node needs a path, it makes a request to `/plan_path` and waits for the response

### Actions

An **action** is like a service but for long-running tasks. Actions provide feedback during execution.

**Action Communication:**
```
Action Client → Goal → Action Server
                ← Feedback ←
                ← Result ←
```

**Example:**
- A `/navigate_to_goal` action allows clients to send a goal and receive progress feedback

## Building ROS 2 Packages

A ROS 2 package is a directory containing code, configuration, and metadata.

**Package Structure:**
```
my_package/
├── package.xml       # Package metadata
├── setup.py         # Python setup
├── setup.cfg        # Setup configuration
├── my_package/
│   ├── __init__.py
│   ├── publisher_node.py
│   └── subscriber_node.py
└── launch/
    └── my_launch.launch.py
```

**package.xml Example:**
```xml
<?xml version="1.0"?>
<package format="3">
  <name>my_robot_package</name>
  <version>0.1.0</version>
  <description>My robot package</description>
  <maintainer email="me@example.com">Me</maintainer>
  <license>Apache-2.0</license>

  <depend>rclpy</depend>
  <depend>std_msgs</depend>
  <depend>sensor_msgs</depend>
</package>
```

## Launch Files

Launch files (.launch.py) allow you to start multiple nodes with configured parameters.

**Launch File Example:**
```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_package',
            executable='publisher_node',
            name='publisher'
        ),
        Node(
            package='my_package',
            executable='subscriber_node',
            name='subscriber'
        ),
    ])
```

## Parameter Management

Parameters allow nodes to configure behavior at runtime.

**Using Parameters:**
```python
# In a node
self.declare_parameter('max_speed', 1.0)
max_speed = self.get_parameter('max_speed').value
```

## Working with Python and rclpy

**Minimal Publisher Node:**
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        self.timer = self.create_timer(0.5, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello ROS 2!'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: {msg.data}')

def main():
    rclpy.init()
    node = MinimalPublisher()
    rclpy.spin(node)

if __name__ == '__main__':
    main()
```

## Next Steps

Now that you understand ROS 2 fundamentals, you're ready to:
1. Simulate robots in **Gazebo** using URDF models
2. Learn robot description formats
3. Bridge Python agents to ROS controllers
4. Build real distributed robot systems

---

**Key Takeaway**: ROS 2's distributed node architecture, combined with topic-based communication, creates flexible, scalable robot systems. Mastering nodes, topics, and services is essential for all advanced robotics work.
