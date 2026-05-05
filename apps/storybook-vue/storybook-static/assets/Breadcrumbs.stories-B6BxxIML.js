const s={title:"Navigation/Breadcrumbs",tags:["autodocs"]},r={render:()=>{const e=document.createElement("div");return e.innerHTML=`
      <tarmac-breadcrumbs divider-style="slash" size="lg">
        <tarmac-breadcrumb-cell label="Home" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="Orders" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="ORD-78901" cell-style="black" is-current></tarmac-breadcrumb-cell>
      </tarmac-breadcrumbs>
    `,e}},a={render:()=>{const e=document.createElement("div");return e.innerHTML=`
      <tarmac-breadcrumbs divider-style="chevron" size="sm">
        <tarmac-breadcrumb-cell label="Dashboard" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="Shipments" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="AWB-9876543" cell-style="black" is-current></tarmac-breadcrumb-cell>
      </tarmac-breadcrumbs>
    `,e}};var c,l,t;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.innerHTML = \`
      <tarmac-breadcrumbs divider-style="slash" size="lg">
        <tarmac-breadcrumb-cell label="Home" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="Orders" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="ORD-78901" cell-style="black" is-current></tarmac-breadcrumb-cell>
      </tarmac-breadcrumbs>
    \`;
    return d;
  }
}`,...(t=(l=r.parameters)==null?void 0:l.docs)==null?void 0:t.source}}};var b,m,d;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const d = document.createElement('div');
    d.innerHTML = \`
      <tarmac-breadcrumbs divider-style="chevron" size="sm">
        <tarmac-breadcrumb-cell label="Dashboard" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="Shipments" cell-style="blue" href="#"></tarmac-breadcrumb-cell>
        <tarmac-breadcrumb-cell label="AWB-9876543" cell-style="black" is-current></tarmac-breadcrumb-cell>
      </tarmac-breadcrumbs>
    \`;
    return d;
  }
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const n=["Default","Chevron"];export{a as Chevron,r as Default,n as __namedExportsOrder,s as default};
