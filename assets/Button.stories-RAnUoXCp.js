const S={title:"Atoms/Button",tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","outline","black","white","info","success","error","warning","dlv_red","coal"]},size:{control:"select",options:["sm","md","lg"]},buttonStyle:{control:"select",options:["primary","secondary","tertiary"]},text:{control:"text"},disabled:{control:"boolean"},isLoading:{control:"boolean"},isRounded:{control:"boolean"},isGhost:{control:"boolean"}},render:t=>{const e=document.createElement("tarmac-button");return e.setAttribute("variant",t.variant||"primary"),e.setAttribute("size",t.size||"md"),e.setAttribute("button-style",t.buttonStyle||"primary"),t.text&&e.setAttribute("text",t.text),t.disabled&&e.setAttribute("disabled",""),t.isLoading&&e.setAttribute("is-loading",""),t.isRounded&&e.setAttribute("is-rounded",""),t.isGhost&&e.setAttribute("is-ghost",""),t.text||(e.textContent="Button"),e}},r={args:{text:"Track Shipment",variant:"primary",size:"md"}},a={render:()=>{const t=document.createElement("div");return t.style.cssText="display:flex;align-items:center;gap:12px",t.innerHTML=`
      <tarmac-button size="sm" text="Small"></tarmac-button>
      <tarmac-button size="md" text="Medium"></tarmac-button>
      <tarmac-button size="lg" text="Large"></tarmac-button>
    `,t}},o={render:()=>{const t=document.createElement("div");return t.style.cssText="display:flex;flex-wrap:wrap;gap:12px",t.innerHTML=`
      <tarmac-button variant="primary" text="Primary"></tarmac-button>
      <tarmac-button variant="secondary" text="Secondary"></tarmac-button>
      <tarmac-button variant="outline" text="Outline"></tarmac-button>
    `,t}},n={render:()=>{const t=document.createElement("div");return t.style.cssText="display:flex;flex-wrap:wrap;gap:12px",t.innerHTML=`
      <tarmac-button variant="primary" text="Normal"></tarmac-button>
      <tarmac-button variant="primary" text="Disabled" disabled></tarmac-button>
      <tarmac-button variant="primary" text="Loading" is-loading></tarmac-button>
      <tarmac-button variant="primary" text="Rounded" is-rounded></tarmac-button>
      <tarmac-button variant="primary" text="Ghost" is-ghost></tarmac-button>
    `,t}},i={render:()=>{const t=document.createElement("div");return t.style.cssText="display:flex;gap:12px",t.innerHTML=`
      <tarmac-button background-color="#ED4136" text-color="white" hover-color="#c4352c" text="Delhivery Red"></tarmac-button>
      <tarmac-button background-color="#5b80f7" text-color="white" hover-color="#4a6cd4" is-rounded text="Delhivery Blue"></tarmac-button>
    `,t}};var c,s,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    text: 'Track Shipment',
    variant: 'primary',
    size: 'md'
  }
}`,...(m=(s=r.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};var d,u,l;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;align-items:center;gap:12px';
    div.innerHTML = \`
      <tarmac-button size="sm" text="Small"></tarmac-button>
      <tarmac-button size="md" text="Medium"></tarmac-button>
      <tarmac-button size="lg" text="Large"></tarmac-button>
    \`;
    return div;
  }
}`,...(l=(u=a.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};var b,p,x;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px';
    div.innerHTML = \`
      <tarmac-button variant="primary" text="Primary"></tarmac-button>
      <tarmac-button variant="secondary" text="Secondary"></tarmac-button>
      <tarmac-button variant="outline" text="Outline"></tarmac-button>
    \`;
    return div;
  }
}`,...(x=(p=o.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var v,y,g;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px';
    div.innerHTML = \`
      <tarmac-button variant="primary" text="Normal"></tarmac-button>
      <tarmac-button variant="primary" text="Disabled" disabled></tarmac-button>
      <tarmac-button variant="primary" text="Loading" is-loading></tarmac-button>
      <tarmac-button variant="primary" text="Rounded" is-rounded></tarmac-button>
      <tarmac-button variant="primary" text="Ghost" is-ghost></tarmac-button>
    \`;
    return div;
  }
}`,...(g=(y=n.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var f,h,T;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;gap:12px';
    div.innerHTML = \`
      <tarmac-button background-color="#ED4136" text-color="white" hover-color="#c4352c" text="Delhivery Red"></tarmac-button>
      <tarmac-button background-color="#5b80f7" text-color="white" hover-color="#4a6cd4" is-rounded text="Delhivery Blue"></tarmac-button>
    \`;
    return div;
  }
}`,...(T=(h=i.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};const w=["Default","Sizes","Variants","States","CustomColors"];export{i as CustomColors,r as Default,a as Sizes,n as States,o as Variants,w as __namedExportsOrder,S as default};
