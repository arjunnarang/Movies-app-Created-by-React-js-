import React, { Component } from 'react';

class Pagination extends Component {
    state = {  }
    render() { 
        return ( 
            <nav>
    <ul class="pagination justify-content-center">
        {this.props.currPage === 1 ? <li class="page-item disabled">
            <span class="page-link">Previous</span>
        </li>: <li class="page-item " onClick={this.props.prevPage}>
            <span class="page-link">Previous</span>
        </li>}
        

    {this.props.pages.map((pageCount) => {

        return (
            this.props.currPage === pageCount ? (<li className="page-item active">
                <a className="page-link" href="#">{pageCount}</a>
            </li>): (<li className="page-item" onClick={() => {this.props.setPage(pageCount);}}>
                <a className="page-link" href="#">{pageCount}</a>
            </li>)
        );
    })}
    
    {this.props.currPage === this.props.pages.length ? <li class="page-item disabled">
            <span class="page-link">Next</span>
        </li>: <li class="page-item " onClick={this.props.nextPage}>
            <span class="page-link">Next</span>
        </li>}
  </ul>
</nav>
         );
    }
}
 
export default Pagination;
