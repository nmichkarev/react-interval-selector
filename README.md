# react-interval-selector

React UI component for selecting elements of set.

![DEMO image](https://github.com/VasaPopkin/react-interval-selector/blob/docs/demo/select-demo.gif)

## Install

```shell
npm install react-interval-selector
```

## Usage
```shell
import ReactIntervalSelector from 'react-interval-selector';

...
    <ReactIntervalSelector />
...
```

## Properties
- initializer(from, to, interval)
Use this property to define a function that will create an array of elements. By default component will create a set of time intervals from '00:00' to '23:30'

- fromInterval
- toInterval
- interval
Theese values will be passed to initializer

- onChangeSelection
Set a handler to detect changes. The array of current values for every element will be passed to function ([true, false, true ...]).