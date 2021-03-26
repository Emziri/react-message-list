import React, { Component } from "react";

class PageSelector extends Component {
  //method to dynamically generate page number buttons
  generatePageBtns() {
    const pList = [];

    for(let i = 1; i <= this.props.last; i++){
      pList.push(i);
    }

    const pages = pList.map((page) => 
      <li key={page}>
        <button className={"page-btn " + (page === this.props.cur ? 'currently' : '')} onClick={() => this.props.pageChange(page)}>
          {page}
        </button>
      </li>);

    return pages;
  }
  
  render() {
    const pageList = this.generatePageBtns();
    const cur = this.props.cur;

    return (
      <ul className="page-nums">

        {cur > 1 &&
        <li>
          <button className="page-btn" onClick={() => this.props.pageChange(cur - 1)}>
           &lt;
          </button>
        </li>
        }

        {pageList}

        {cur < this.props.last &&
        <li>
          <button className="page-btn" onClick={() => this.props.pageChange(cur + 1)}>
            &gt;
          </button>
        </li>
        }
        
      </ul>
    );
  }
}

export default PageSelector;
