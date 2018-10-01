import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';

export const composer = (queries) => {
    const mapper = {};
    Object.keys(queries).forEach(key => {
        const { definitions } = queries[key];
        const { operation } = definitions[0];
        if (operation === 'query') {
            mapper[key] = ({ render }) => <Query query={queries[key]}>{render}</Query>;
        } else if (operation === 'mutation') {
            mapper[key] = ({ render }) => <Mutation mutation={queries[key]}>{(mutation, result) => render({ mutation, result })}</Mutation>
        }
    });
    const mapProps = (props) => {
        const _errors = Object.keys(props)
                              .map(key => props[key].error)
                              .filter(error => error !== undefined)
        return {
            ...props,
            _loading: Object.keys(props).map(key => props[key].loading).includes(true),
            _hasError: _errors.length > 0,
            _errors,
        }
    };
    return adopt(mapper, mapProps);
}

export class ReactApolloCompose extends React.Component {
    constructor(props) {
        super(props)
        this.composed = composer(props.queries)
    }

    render() {
        const { queries, ...props } = this.props
        return <this.composed {...props} />
    }
}

ReactApolloCompose.propTypes = {
  queries: PropTypes.object.isRequired,
};

export default ReactApolloCompose;
