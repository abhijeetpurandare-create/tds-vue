const n={title:"Layout/Collapse",tags:["autodocs"]},t={render:()=>{const e=document.createElement("div");return e.style.cssText="width:400px",e.innerHTML=`
      <tarmac-collapse active-key="p1">
        <div data-key="p1" data-title="Shipment Details">AWB: 1234567890 — In Transit from Mumbai Hub</div>
        <div data-key="p2" data-title="Delivery Address">123 Main Street, Sector 5, Delhi NCR 110001</div>
        <div data-key="p3" data-title="Payment Info">COD — ₹1,250.00</div>
      </tarmac-collapse>
    `,e}},a={render:()=>{const e=document.createElement("div");return e.style.cssText="width:400px",e.innerHTML=`
      <tarmac-collapse accordion>
        <div data-key="faq1" data-title="How do I track my order?">Use the AWB number on our tracking page.</div>
        <div data-key="faq2" data-title="What is the delivery time?">Standard delivery takes 3-5 business days.</div>
        <div data-key="faq3" data-title="Can I reschedule delivery?">Yes, contact support or use the app.</div>
      </tarmac-collapse>
    `,e}};var d,r,i;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'width:400px';
    d.innerHTML = \`
      <tarmac-collapse active-key="p1">
        <div data-key="p1" data-title="Shipment Details">AWB: 1234567890 — In Transit from Mumbai Hub</div>
        <div data-key="p2" data-title="Delivery Address">123 Main Street, Sector 5, Delhi NCR 110001</div>
        <div data-key="p3" data-title="Payment Info">COD — ₹1,250.00</div>
      </tarmac-collapse>
    \`;
    return d;
  }
}`,...(i=(r=t.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};var s,c,o;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.style.cssText = 'width:400px';
    d.innerHTML = \`
      <tarmac-collapse accordion>
        <div data-key="faq1" data-title="How do I track my order?">Use the AWB number on our tracking page.</div>
        <div data-key="faq2" data-title="What is the delivery time?">Standard delivery takes 3-5 business days.</div>
        <div data-key="faq3" data-title="Can I reschedule delivery?">Yes, contact support or use the app.</div>
      </tarmac-collapse>
    \`;
    return d;
  }
}`,...(o=(c=a.parameters)==null?void 0:c.docs)==null?void 0:o.source}}};const l=["Default","Accordion"];export{a as Accordion,t as Default,l as __namedExportsOrder,n as default};
