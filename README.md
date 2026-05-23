# Solaris — Space Operations & Orbital Intelligence Terminal

Real-time 3D space operations terminal tracking the full Starlink constellation and visualizing orbital mechanics for LEO satellite infrastructure. Includes an orbital datacenter placement simulator modeling compute density, coverage windows, and handoff patterns across low Earth orbit.

**[Live Demo](https://solaris-production-c09a.up.railway.app)**

## What It Does

- Tracks 6,000+ active Starlink satellites in real time using live TLE data from Celestrak
- Renders the full constellation on an interactive 3D globe with orbital path projection
- Simulates orbital datacenter scenarios: compute node placement, ground station coverage, pass duration, and inter-satellite link topology
- Propagates satellite positions using SGP4 orbital mechanics (satellite.js)

## Stack

**Frontend:** React 18, TypeScript, Vite  
**Visualization:** globe.gl (Three.js-backed WebGL globe)  
**Orbital Mechanics:** satellite.js (SGP4/SDP4 propagation)  
**Infra:** Railway, Nixpacks

## Why

The same grid interconnection bottleneck driving terrestrial datacenter constraints doesn't exist in orbit. Solaris models the infrastructure layer of LEO compute — what coverage looks like, where latency is acceptable, and how orbital mechanics constrain placement — as a complement to ground-based siting analysis.
