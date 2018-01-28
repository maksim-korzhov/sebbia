import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//import { getCategoryNews } from "actions";

class NewsDetail extends Component {
    constructor(props) {
        super(props);

        this.newsId = parseInt(props.match.params.newsId);
    }


    componentWillMount() {

    }

    getItemInfo() {
        const { newsList } = this.props;
        const data = {};

        for( const categoryId in newsList ) {
            newsList[categoryId].forEach( item => {
                if( item.id === this.newsId ) {
                    data.categoryId = categoryId;
                    data.info = item;
                }
            });
        }

        return data;
    }

    isNoDetailInfo(info) {
        return !Object.keys(info).length;
    }

    renderNewsDetail(detailInfo) {
        const { info: { title, shortDescription } }  = detailInfo;

        return (
            <div className="news-detail">
                <h1 className="news-detail__title">{ title }</h1>
                <div className="news-detail__description">{ shortDescription }</div>
            </div>
        );
    }

    render() {
        const detailInfo = this.getItemInfo();

        return (
            this.isNoDetailInfo(detailInfo) ? <div>Нет информации</div> : this.renderNewsDetail(detailInfo)
        );
    }
}

const mapStateToProps = ({ newsReducer: { news } }) => {
    const { newsList } = news;
    return { newsList };
};

export default connect(mapStateToProps)(NewsDetail);