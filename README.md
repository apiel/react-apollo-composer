# react-apollo-compose

> react apollo composer for queries and mutations

![NPM](https://img.shields.io/npm/v/react-apollo-composer.svg)

## Install

```bash
npm install --save react-apollo-composer
```

```bash
yarn add react-apollo-composer --save
```

## Usage

```jsx
import React from 'react';
import gql from 'graphql-tag';
import Queries from 'react-apollo-composer';

const GET_ME = 'getMe { name }';
const GET_WEATHER = 'getWeather { temperature, unit }';

const Example = () => (
  <Queries queries={{ me: GET_ME, weather: GET_WEATHER }}>
    {({ me, weather, _loading, _hasError }) => {
        if (_loading) return <p>Loading...</p>;
        if (_hasError) return <p>Error :(</p>;

        return (
          <div>
            <p>Hello, { me.data.name }</p>
            <p>It's {weather.data.temperature}°{weather.data.unit}</p>
          </div>
        )

    }}
  </Queries>
);
```

Property **queries** is an object that can accept graphql query and mutation.
The child element, will be called with the rendered query and mutation, and few extra variable:

- **_loading** : true if one of the query is loading
- **_error** : combine all error variable from each query to one array
- **_hasError** : true if one of the query has an error

## Why

Because it is much more cool than:

```jsx
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_ME = 'getMe { name }';
const GET_WEATHER = 'getWeather { temperature, unit }';

const Example = () => (
  <Query query={GET_ME}>
    {({ loading, error, data }) => {
        if (_loading) return <p>Loading...</p>;
        if (_hasError) return <p>Error :(</p>;

        return (
          <div>
            <p>Hello, { data.name }</p>
            <Query query={GET_WEATHER}>
              {({ loading, error, data }) => {
                  if (_loading) return <p>Loading...</p>;
                  if (_hasError) return <p>Error :(</p>;

                  return (
                    <p>It's {data.temperature}°{data.unit}</p>
                  )

              }}
            </Query>
          </div>
        )

    }}
  </Query>
);
```

And easier than (even if react-adopt is super cool):

```jsx
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';

const GET_ME = 'getMe { name }';
const GET_WEATHER = 'getWeather { temperature, unit }';

const Compose = adopt({
  me: ({ render }) => <Query query={GET_ME}>{render}</Query>,
  weather: ({ render }) => <Query query={GET_WEATHER}>{render}</Query>,
});

const Example = () => (
  <Compose>
    {({ me, followers }) => {
        if (me.loading || weather.loading) return <p>Loading...</p>;
        if (me.error || weather.error) return <p>Error :(</p>;

        return (
          <div>
            <p>Hello, { me.data.name }</p>
            <p>It's {weather.data.temperature}°{weather.data.unit}</p>
          </div>
        )

    }}
  </Compose>
);
```

I use react-adopt in this library and in some case it might fit better your requierement.

## License

MIT © [Alexandre Piel]
