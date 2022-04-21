import { LitElement} from 'lit';
import {render, styles} from "./pdf.tpl.js";
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { saveAs } from 'file-saver';


class AccPDF extends LitElement {
  static get properties() {
        return {
          orientation : {type: String},
          unit : {type: String},
          format : {type: Array}, 
          pdf_name : {type: String},
          data : {type: Object},
          title : {type: Array},
          label : {type: Array},
          table_name: {type: String},
          type: {type: String}
          

        };
  }

  static get styles() {
    return styles();
  }
  constructor() {
    super();
    this.render = render.bind(this);
    this.orientation = "landscape";
    this.unit = "in";
    this.format = [8, 10];
    this.title = "Pdf Name" 
    this.pdf_name = this.title;
    this.table_name = "Table name"
    this.data = [["Hello",  "World"], ["There",  "Universe"]];
    this.label = [["Header 1", "Header 2"]];
    this.version = "alpha";
    this.type = "table";
    this.pdf_frame;
    this.iframe;

    
  }

  firstUpdated(){
    this.pdf_frame = this.shadowRoot.querySelector("#pdfFrame");
    this.pdf = this.genPDF();
    this.addEventListener("click", this.savePDF(this.pdf));

  }

  savePDF(pdf){
    if(this.pdf_name.includes(" ")){
      const search = ' ';
      const replaceWith = '-';
      this.pdf_name = this.pdf_name.split(search).join(replaceWith);
    }
    pdf.output('pdfobjectnewwindow');
    
  }
  genPDF(){
    var doc = new jsPDF({ putOnlyUsedFonts: true,})

    doc.setProperties({
      title: this.pdf_name,
      subject: 'This is the subject',
      author: 'UC Davis',
      keywords: 'generated, javascript, web 2.0, ajax',
      creator: 'Aggie Crop Calculator'
    });

    if(this.type == "text"){
      // for (let lab of this.label[0]){
      //   console.log(lab)
      //   //doc.text(20, 20, lab);
      //   //this.data.map(console.log());
      //   this.data.forEach(function (entry) {
      //     console.log(entry);
      //   });
      // }
      doc.text(20, 20, 'This is PDF text sample that is in development!');
    }

    if(this.type == "table"){
      // From HTML
      doc.autoTable({ html: '.table' })
    
      // From Javascript
      var finalY = doc.lastAutoTable.finalY || 10
      doc.text(this.table_name, 14, finalY + 15)
      doc.autoTable({
        startY: finalY + 20,
        head: this.label,
        body: this.data,
      })
    }
    
    this.iframe = document.createElement('iframe');
		this.iframe.setAttribute('style', 'height:750px; width:100%');
		this.pdf_frame.appendChild(this.iframe);
		this.iframe.src = doc.output('datauristring');
    return doc
  }

}

customElements.define('acc-pdf', AccPDF);