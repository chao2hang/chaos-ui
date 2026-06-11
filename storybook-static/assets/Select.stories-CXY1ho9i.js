import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{a as n,c as r,i,l as a,n as o,o as s,r as c,s as l,t as u}from"./select-vJ4_3F_x.js";var d,f,p,m,h,g,_;e((()=>{d=t(),a(),f={title:`Components/Select`,component:u,tags:[`autodocs`]},p={render:()=>(0,d.jsxs)(u,{children:[(0,d.jsx)(l,{className:`w-[180px]`,children:(0,d.jsx)(r,{placeholder:`Select a fruit`})}),(0,d.jsx)(o,{children:(0,d.jsxs)(c,{children:[(0,d.jsx)(n,{children:`Fruits`}),(0,d.jsx)(i,{value:`apple`,children:`Apple`}),(0,d.jsx)(i,{value:`banana`,children:`Banana`}),(0,d.jsx)(i,{value:`blueberry`,children:`Blueberry`}),(0,d.jsx)(i,{value:`grapes`,children:`Grapes`}),(0,d.jsx)(i,{value:`pineapple`,children:`Pineapple`})]})})]})},m={render:()=>(0,d.jsxs)(u,{children:[(0,d.jsx)(l,{size:`sm`,className:`w-[180px]`,children:(0,d.jsx)(r,{placeholder:`Small select`})}),(0,d.jsxs)(o,{children:[(0,d.jsx)(i,{value:`1`,children:`Option 1`}),(0,d.jsx)(i,{value:`2`,children:`Option 2`}),(0,d.jsx)(i,{value:`3`,children:`Option 3`})]})]})},h={render:()=>(0,d.jsxs)(u,{children:[(0,d.jsx)(l,{className:`w-[200px]`,children:(0,d.jsx)(r,{placeholder:`Select a food`})}),(0,d.jsxs)(o,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(n,{children:`Fruits`}),(0,d.jsx)(i,{value:`apple`,children:`Apple`}),(0,d.jsx)(i,{value:`banana`,children:`Banana`})]}),(0,d.jsx)(s,{}),(0,d.jsxs)(c,{children:[(0,d.jsx)(n,{children:`Vegetables`}),(0,d.jsx)(i,{value:`carrot`,children:`Carrot`}),(0,d.jsx)(i,{value:`potato`,children:`Potato`})]})]})]})},g={render:()=>(0,d.jsxs)(u,{disabled:!0,children:[(0,d.jsx)(l,{className:`w-[180px]`,children:(0,d.jsx)(r,{placeholder:`Disabled`})}),(0,d.jsx)(o,{children:(0,d.jsx)(i,{value:`1`,children:`Option 1`})})]})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Select>\r
      <SelectTrigger className="w-[180px]">\r
        <SelectValue placeholder="Select a fruit" />\r
      </SelectTrigger>\r
      <SelectContent>\r
        <SelectGroup>\r
          <SelectLabel>Fruits</SelectLabel>\r
          <SelectItem value="apple">Apple</SelectItem>\r
          <SelectItem value="banana">Banana</SelectItem>\r
          <SelectItem value="blueberry">Blueberry</SelectItem>\r
          <SelectItem value="grapes">Grapes</SelectItem>\r
          <SelectItem value="pineapple">Pineapple</SelectItem>\r
        </SelectGroup>\r
      </SelectContent>\r
    </Select>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Select>\r
      <SelectTrigger size="sm" className="w-[180px]">\r
        <SelectValue placeholder="Small select" />\r
      </SelectTrigger>\r
      <SelectContent>\r
        <SelectItem value="1">Option 1</SelectItem>\r
        <SelectItem value="2">Option 2</SelectItem>\r
        <SelectItem value="3">Option 3</SelectItem>\r
      </SelectContent>\r
    </Select>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Select>\r
      <SelectTrigger className="w-[200px]">\r
        <SelectValue placeholder="Select a food" />\r
      </SelectTrigger>\r
      <SelectContent>\r
        <SelectGroup>\r
          <SelectLabel>Fruits</SelectLabel>\r
          <SelectItem value="apple">Apple</SelectItem>\r
          <SelectItem value="banana">Banana</SelectItem>\r
        </SelectGroup>\r
        <SelectSeparator />\r
        <SelectGroup>\r
          <SelectLabel>Vegetables</SelectLabel>\r
          <SelectItem value="carrot">Carrot</SelectItem>\r
          <SelectItem value="potato">Potato</SelectItem>\r
        </SelectGroup>\r
      </SelectContent>\r
    </Select>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Select disabled>\r
      <SelectTrigger className="w-[180px]">\r
        <SelectValue placeholder="Disabled" />\r
      </SelectTrigger>\r
      <SelectContent>\r
        <SelectItem value="1">Option 1</SelectItem>\r
      </SelectContent>\r
    </Select>
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Small`,`WithGroups`,`Disabled`]}))();export{p as Default,g as Disabled,m as Small,h as WithGroups,_ as __namedExportsOrder,f as default};