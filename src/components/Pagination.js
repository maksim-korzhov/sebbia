import React, { Component } from "react";
import { Link } from "react-router-dom";

class Pagination extends Component {
    renderPrevLink(currentPage, baseLink, onPageClick) {
        const linkText = "Назад";

        switch(currentPage) {
            case 0:
                return <span className="page-link">{ linkText }</span>;
            case 1:
                return (
                    <Link
                        className="page-link"
                        to={ baseLink }
                        onClick={ () => onPageClick(currentPage - 1) }
                    >{ linkText }</Link>
                );
            default:
                return (
                    <Link
                        className="page-link"
                        to={ `${ baseLink }/page/${ currentPage - 1 }` }
                        onClick={ () => onPageClick(currentPage - 1) }
                    >{ linkText }</Link>
                );
        }
    }

    renderNextLink(currentPage, baseLink, onPageClick, isNextPage) {
        const linkText = "Вперёд";

        if( isNextPage ) {
            return (
                <Link
                    className="page-link"
                    to={`${ baseLink }/page/${ currentPage + 1 }`}
                    onClick={() => onPageClick(currentPage + 1)}
                >{linkText}</Link>
            );
        } else {
            return <span className="page-link">{ linkText }</span>;
        }
    }

    render() {
        const { currentPage, baseLink, onPageClick, isNextPage } = this.props;

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${ currentPage === 0 ? "disabled" : "" }`}>
                        { this.renderPrevLink(currentPage, baseLink, onPageClick) }
                    </li>
                    <li className={`page-item ${ isNextPage ? "" : "disabled" }`}>
                        { this.renderNextLink(currentPage, baseLink, onPageClick, isNextPage) }
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;