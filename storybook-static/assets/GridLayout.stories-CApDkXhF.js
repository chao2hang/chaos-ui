import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{n,t as r}from"./utils-CMVnEVHk.js";import{n as i,t as a}from"./dist-BiFzeHEN.js";import{c as o,r as s,t as c}from"./card-kUQbP-z5.js";function l({className:e,columns:t,gap:n,align:i,justify:a,responsive:o,children:s,...c}){let l=o?r(o.sm&&`sm:grid-cols-${o.sm}`,o.md&&`md:grid-cols-${o.md}`,o.lg&&`lg:grid-cols-${o.lg}`,o.xl&&`xl:grid-cols-${o.xl}`):``;return(0,d.jsx)(`div`,{"data-slot":`grid-layout`,className:r(f({columns:t,gap:n,align:i,justify:a}),l,e),...c,children:s})}function u({className:e,span:t,rowSpan:n,start:i,end:a,children:o,...s}){return(0,d.jsx)(`div`,{"data-slot":`grid-item`,className:r(t&&`col-span-${t}`,n&&`row-span-${n}`,i&&`col-start-${i}`,a&&`col-end-${a}`,e),...s,children:o})}var d,f,p=e((()=>{d=t(),n(),i(),f=a(`grid`,{variants:{columns:{1:`grid-cols-1`,2:`grid-cols-2`,3:`grid-cols-3`,4:`grid-cols-4`,5:`grid-cols-5`,6:`grid-cols-6`,12:`grid-cols-12`,auto:`grid-cols-[repeat(auto-fill,minmax(250px,1fr))]`},gap:{none:`gap-0`,sm:`gap-2`,default:`gap-4`,lg:`gap-6`,xl:`gap-8`},align:{start:`items-start`,center:`items-center`,end:`items-end`,stretch:`items-stretch`},justify:{start:`justify-start`,center:`justify-center`,end:`justify-end`,between:`justify-between`}},defaultVariants:{columns:1,gap:`default`,align:`stretch`,justify:`start`}}),l.__docgenInfo={description:``,methods:[],displayName:`GridLayout`,props:{children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},responsive:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  sm?: number
  md?: number
  lg?: number
  xl?: number
}`,signature:{properties:[{key:`sm`,value:{name:`number`,required:!1}},{key:`md`,value:{name:`number`,required:!1}},{key:`lg`,value:{name:`number`,required:!1}},{key:`xl`,value:{name:`number`,required:!1}}]}},description:``}},composes:[`VariantProps`]},u.__docgenInfo={description:``,methods:[],displayName:`GridItem`,props:{span:{required:!1,tsType:{name:`number`},description:``},rowSpan:{required:!1,tsType:{name:`number`},description:``},start:{required:!1,tsType:{name:`number`},description:``},end:{required:!1,tsType:{name:`number`},description:``},children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})),m,h,g,_,v,y,b;e((()=>{m=t(),p(),o(),h={title:`Components/GridLayout`,component:l,tags:[`autodocs`]},g={render:()=>(0,m.jsx)(l,{columns:3,children:Array.from({length:6}).map((e,t)=>(0,m.jsx)(c,{children:(0,m.jsx)(s,{className:`p-4 text-center`,children:t+1})},t))})},_={render:()=>(0,m.jsx)(l,{columns:4,children:Array.from({length:8}).map((e,t)=>(0,m.jsx)(c,{children:(0,m.jsx)(s,{className:`p-4 text-center`,children:t+1})},t))})},v={render:()=>(0,m.jsx)(l,{columns:`auto`,children:Array.from({length:5}).map((e,t)=>(0,m.jsx)(c,{children:(0,m.jsxs)(s,{className:`p-4 text-center`,children:[`Auto `,t+1]})},t))})},y={render:()=>(0,m.jsxs)(l,{columns:4,children:[(0,m.jsx)(u,{span:2,children:(0,m.jsx)(c,{children:(0,m.jsx)(s,{className:`p-4 text-center`,children:`Span 2`})})}),(0,m.jsx)(c,{children:(0,m.jsx)(s,{className:`p-4 text-center`,children:`1`})}),(0,m.jsx)(c,{children:(0,m.jsx)(s,{className:`p-4 text-center`,children:`1`})}),(0,m.jsx)(u,{span:4,children:(0,m.jsx)(c,{children:(0,m.jsx)(s,{className:`p-4 text-center`,children:`Full Width`})})})]})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <GridLayout columns={3}>\r
      {Array.from({
      length: 6
    }).map((_, i) => <Card key={i}>\r
          <CardContent className="p-4 text-center">{i + 1}</CardContent>\r
        </Card>)}\r
    </GridLayout>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <GridLayout columns={4}>\r
      {Array.from({
      length: 8
    }).map((_, i) => <Card key={i}>\r
          <CardContent className="p-4 text-center">{i + 1}</CardContent>\r
        </Card>)}\r
    </GridLayout>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <GridLayout columns="auto">\r
      {Array.from({
      length: 5
    }).map((_, i) => <Card key={i}>\r
          <CardContent className="p-4 text-center">Auto {i + 1}</CardContent>\r
        </Card>)}\r
    </GridLayout>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <GridLayout columns={4}>\r
      <GridItem span={2}>\r
        <Card><CardContent className="p-4 text-center">Span 2</CardContent></Card>\r
      </GridItem>\r
      <Card><CardContent className="p-4 text-center">1</CardContent></Card>\r
      <Card><CardContent className="p-4 text-center">1</CardContent></Card>\r
      <GridItem span={4}>\r
        <Card><CardContent className="p-4 text-center">Full Width</CardContent></Card>\r
      </GridItem>\r
    </GridLayout>
}`,...y.parameters?.docs?.source}}},b=[`Default`,`FourColumns`,`AutoColumns`,`WithSpan`]}))();export{v as AutoColumns,g as Default,_ as FourColumns,y as WithSpan,b as __namedExportsOrder,h as default};