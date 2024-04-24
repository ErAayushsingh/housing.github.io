import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';
import ChartComponent from './ChartComponent';
import ScrollableTableComponent from './ScrollableTableComponent';
import CitySocietySelector from './CitySocietySelector';


class PDFGenerator extends React.Component {
  generatePDF = () => {
    const input = document.getElementById('pdf-content');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("page.pdf");
      });
  };

  render() {
    return (
      <div style={{ textAlign: 'center',paddingTop:'50px' }}>
        <button className='custom-btn' onClick={this.generatePDF}>Generate PDF</button>
        <div id="pdf-content"> 
        <div style={{ textAlign: 'center'}}>
                <h2 style={{ color:'red' }}>Neighborhood Living Standards</h2>
                <h3>Your Society vs City vs PAN India</h3>
                <CitySocietySelector/>
          </div>   
      </div>
    </div>
    );
  }
}

export default PDFGenerator;
