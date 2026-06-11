import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{a as n,c as r,i,n as a,o,r as s,s as c,t as l}from"./table-C9s2fIyD.js";import{n as u,t as d}from"./badge-XiTNG6e3.js";var f,p,m,h,g,_;e((()=>{f=t(),r(),u(),p={title:`Components/Table`,component:l,tags:[`autodocs`]},m=[{invoice:`INV001`,status:`paid`,method:`Credit Card`,amount:`$250.00`},{invoice:`INV002`,status:`pending`,method:`PayPal`,amount:`$150.00`},{invoice:`INV003`,status:`unpaid`,method:`Bank Transfer`,amount:`$350.00`},{invoice:`INV004`,status:`paid`,method:`Credit Card`,amount:`$450.00`},{invoice:`INV005`,status:`paid`,method:`PayPal`,amount:`$550.00`}],h={render:()=>(0,f.jsx)(`div`,{className:`w-full max-w-2xl`,children:(0,f.jsxs)(l,{children:[(0,f.jsx)(s,{children:`A list of your recent invoices.`}),(0,f.jsx)(o,{children:(0,f.jsxs)(c,{children:[(0,f.jsx)(n,{className:`w-[100px]`,children:`Invoice`}),(0,f.jsx)(n,{children:`Status`}),(0,f.jsx)(n,{children:`Method`}),(0,f.jsx)(n,{className:`text-right`,children:`Amount`})]})}),(0,f.jsx)(a,{children:m.map(e=>(0,f.jsxs)(c,{children:[(0,f.jsx)(i,{className:`font-medium`,children:e.invoice}),(0,f.jsx)(i,{children:(0,f.jsx)(d,{variant:e.status===`paid`?`default`:e.status===`pending`?`secondary`:`destructive`,children:e.status})}),(0,f.jsx)(i,{children:e.method}),(0,f.jsx)(i,{className:`text-right`,children:e.amount})]},e.invoice))})]})})},g={render:()=>(0,f.jsx)(`div`,{className:`w-full max-w-2xl`,children:(0,f.jsxs)(l,{children:[(0,f.jsx)(o,{children:(0,f.jsxs)(c,{children:[(0,f.jsx)(n,{children:`Name`}),(0,f.jsx)(n,{children:`Email`}),(0,f.jsx)(n,{children:`Role`})]})}),(0,f.jsxs)(a,{children:[(0,f.jsxs)(c,{children:[(0,f.jsx)(i,{children:`John Doe`}),(0,f.jsx)(i,{children:`john@example.com`}),(0,f.jsx)(i,{children:`Admin`})]}),(0,f.jsxs)(c,{children:[(0,f.jsx)(i,{children:`Jane Smith`}),(0,f.jsx)(i,{children:`jane@example.com`}),(0,f.jsx)(i,{children:`User`})]})]})]})})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl">\r
      <Table>\r
        <TableCaption>A list of your recent invoices.</TableCaption>\r
        <TableHeader>\r
          <TableRow>\r
            <TableHead className="w-[100px]">Invoice</TableHead>\r
            <TableHead>Status</TableHead>\r
            <TableHead>Method</TableHead>\r
            <TableHead className="text-right">Amount</TableHead>\r
          </TableRow>\r
        </TableHeader>\r
        <TableBody>\r
          {invoices.map(invoice => <TableRow key={invoice.invoice}>\r
              <TableCell className="font-medium">{invoice.invoice}</TableCell>\r
              <TableCell>\r
                <Badge variant={invoice.status === "paid" ? "default" : invoice.status === "pending" ? "secondary" : "destructive"}>\r
                  {invoice.status}\r
                </Badge>\r
              </TableCell>\r
              <TableCell>{invoice.method}</TableCell>\r
              <TableCell className="text-right">{invoice.amount}</TableCell>\r
            </TableRow>)}\r
        </TableBody>\r
      </Table>\r
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-2xl">\r
      <Table>\r
        <TableHeader>\r
          <TableRow>\r
            <TableHead>Name</TableHead>\r
            <TableHead>Email</TableHead>\r
            <TableHead>Role</TableHead>\r
          </TableRow>\r
        </TableHeader>\r
        <TableBody>\r
          <TableRow>\r
            <TableCell>John Doe</TableCell>\r
            <TableCell>john@example.com</TableCell>\r
            <TableCell>Admin</TableCell>\r
          </TableRow>\r
          <TableRow>\r
            <TableCell>Jane Smith</TableCell>\r
            <TableCell>jane@example.com</TableCell>\r
            <TableCell>User</TableCell>\r
          </TableRow>\r
        </TableBody>\r
      </Table>\r
    </div>
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Simple`]}))();export{h as Default,g as Simple,_ as __namedExportsOrder,p as default};