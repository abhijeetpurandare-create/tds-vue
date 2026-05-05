const b={title:"Atoms/Alert",tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","success","error","warning","info","white","black","coal"]},size:{control:"select",options:["sm","md","lg"]},alertStyle:{control:"select",options:["singleText","dualText"]},title:{control:"text"},description:{control:"text"},closable:{control:"boolean"},showCtas:{control:"boolean"}},render:e=>{const t=document.createElement("tarmac-alert");return e.variant&&t.setAttribute("variant",e.variant),e.size&&t.setAttribute("size",e.size),e.alertStyle&&t.setAttribute("alert-style",e.alertStyle),e.title&&t.setAttribute("title",e.title),e.description&&t.setAttribute("description",e.description),e.closable&&t.setAttribute("closable",""),e.showCtas&&t.setAttribute("show-ctas",""),t}},r={args:{variant:"info",title:"Shipment is in transit",size:"lg"}},a={render:()=>{const e=document.createElement("div");return e.style.cssText="display:flex;flex-direction:column;gap:12px;max-width:480px",e.innerHTML=`
      <tarmac-alert variant="success" title="Order delivered successfully"></tarmac-alert>
      <tarmac-alert variant="error" title="Delivery attempt failed"></tarmac-alert>
      <tarmac-alert variant="info" title="Shipment is in transit"></tarmac-alert>
      <tarmac-alert variant="warning" title="Address verification pending"></tarmac-alert>
    `,e}},i={args:{variant:"warning",alertStyle:"dualText",title:"Shipment Delayed",description:"Your package is delayed due to weather conditions. Expected delivery by tomorrow.",size:"lg"}},s={args:{variant:"success",title:"Manifest uploaded — 245 orders added",closable:!0}},n={args:{variant:"error",alertStyle:"dualText",title:"Shipment Delayed",description:"This shipment has exceeded the expected delivery window.",showCtas:!0,size:"lg"}};var l,o,c;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    title: 'Shipment is in transit',
    size: 'lg'
  }
}`,...(c=(o=r.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var d,m,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;flex-direction:column;gap:12px;max-width:480px';
    div.innerHTML = \`
      <tarmac-alert variant="success" title="Order delivered successfully"></tarmac-alert>
      <tarmac-alert variant="error" title="Delivery attempt failed"></tarmac-alert>
      <tarmac-alert variant="info" title="Shipment is in transit"></tarmac-alert>
      <tarmac-alert variant="warning" title="Address verification pending"></tarmac-alert>
    \`;
    return div;
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,v,x;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    alertStyle: 'dualText',
    title: 'Shipment Delayed',
    description: 'Your package is delayed due to weather conditions. Expected delivery by tomorrow.',
    size: 'lg'
  }
}`,...(x=(v=i.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var y,f,h;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    title: 'Manifest uploaded — 245 orders added',
    closable: true
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var g,w,S;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    alertStyle: 'dualText',
    title: 'Shipment Delayed',
    description: 'This shipment has exceeded the expected delivery window.',
    showCtas: true,
    size: 'lg'
  }
}`,...(S=(w=n.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};const T=["Default","AllVariants","DualText","Closable","WithCTAs"];export{a as AllVariants,s as Closable,r as Default,i as DualText,n as WithCTAs,T as __namedExportsOrder,b as default};
