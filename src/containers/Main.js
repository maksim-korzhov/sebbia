import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCategories } from "actions";

class Main extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getCategories());
    }

    isNoCategories() {
        return !Object.keys(this.props.categories).length;
    }

    renderCategoriesList() {
        const { categories } = this.props;

        return categories.map((category) => {
            console.log(category);
            return (
                <li key={ category.id }>
                    <Link to={`/category/${ category.id }`}>{ category.name }</Link>
                </li>
            );
        });
    }

    render() {
        return (
             this.isNoCategories() ? <div>Loading...</div> : <ul className="main">{ this.renderCategoriesList() }</ul>
        );
    }
}

const mapStateToProps = ({ newsReducer }) => {
    return { categories: newsReducer.categories };
};

export default connect(mapStateToProps)(Main);