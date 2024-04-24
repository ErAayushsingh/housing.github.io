import React from 'react';
import './Scroll.css'


const ScrollableTableComponent = ({ comments }) => {
  return (
    <div className="Tabcontainer">
      <div className="scrollable">
        <table className="t1">
          <thead>
            <tr style={{ position: "sticky" }}>
              <th>Like</th>
              <th>Dislike</th>
            </tr>
          </thead>
          <tbody>
            {comments.length &&
              comments?.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item["Like Detailed Comments"]}</td>
                    <td>{item["Dislike Detailed Comments"]}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScrollableTableComponent;
