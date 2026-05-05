const s={title:"Overlay/Modal",tags:["autodocs"]},a={render:()=>{const n=document.createElement("div"),e=document.createElement("tarmac-button");e.setAttribute("text","Open Modal"),e.setAttribute("variant","primary"),e.addEventListener("tarmac-click",()=>{t.setAttribute("is-open","")});const t=document.createElement("tarmac-modal");return t.setAttribute("size","md"),t.setAttribute("title","Shipment Details"),t.innerHTML='<div style="padding:16px"><p>AWB: 1234567890</p><p>Status: In Transit</p><p>Origin: Mumbai Hub</p></div>',t.addEventListener("tarmac-close",()=>{t.removeAttribute("is-open")}),n.appendChild(e),n.appendChild(t),n}};var r,d,i;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    const btn = document.createElement('tarmac-button');
    btn.setAttribute('text', 'Open Modal');
    btn.setAttribute('variant', 'primary');
    btn.addEventListener('tarmac-click', () => {
      modal.setAttribute('is-open', '');
    });
    const modal = document.createElement('tarmac-modal');
    modal.setAttribute('size', 'md');
    modal.setAttribute('title', 'Shipment Details');
    modal.innerHTML = '<div style="padding:16px"><p>AWB: 1234567890</p><p>Status: In Transit</p><p>Origin: Mumbai Hub</p></div>';
    modal.addEventListener('tarmac-close', () => {
      modal.removeAttribute('is-open');
    });
    d.appendChild(btn);
    d.appendChild(modal);
    return d;
  }
}`,...(i=(d=a.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};const o=["Default"];export{a as Default,o as __namedExportsOrder,s as default};
