import React, { Component } from "react";
import { connect } from "react-redux";

import { getCategories } from "actions";

class Main extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getCategories());
    }

    isCategoriesEmpty() {
        return !Object.keys(this.props.categories).length;
    }

    renderCategoriesList() {
        const { categories } = this.props;

        return categories.map((category) => {
            console.log(category);
            return <li key={ category.id }>{ category.name }</li>;
        });
    }

    render() {
        return (
             this.isCategoriesEmpty() ? <div>Loading...</div> : <ul className="main">{ this.renderCategoriesList() }</ul>
        );
    }
}

const mapStateToProps = ({ newsReducer }) => {
    return { categories: newsReducer.categories };
};

export default connect(mapStateToProps)(Main);