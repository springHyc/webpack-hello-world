// import React, { Component } from 'react';

// export default function asyncComponent(importComponent) {
//     class AsyncComponent extends Component {
//         constructor(props) {
//             super(props);
//             this.state = {
//                 component: null
//             };
//         }

//         async componentDidMount() {
//             if (this.hasLoadedComponent()) {
//                 return;
//             }
//             const { default: component } = await importComponent();
//             this.setState({
//                 component: component
//             });
//         }

//         hasLoadedComponent() {
//             return this.state.component !== null;
//         }

//         componentWillUnmount() {
//             this.setState = () => {};
//         }

//         render() {
//             const Component = this.state.component;
//             return Component ? <Component {...this.props} /> : null;
//         }
//     }

//     return AsyncComponent;
// }

// // import React, { Component } from 'react';

// // const asyncComponent = importComponent => {
// //     return class extends Component {
// //         constructor() {
// //             super();
// //             this.state = {
// //                 component: null
// //             };
// //         }
// //         componentDidMount() {
// //             importComponent().then(cmp => {
// //                 this.setState({ component: cmp.default });
// //             });
// //         }
// //         render() {
// //             const C = this.state.component;
// //             return C ? <C {...this.props} /> : null;
// //         }
// //     };
// // };

// // export default asyncComponent;
