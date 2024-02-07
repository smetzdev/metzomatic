const dummyPdfString = `
%PDF-1.4
1 0 obj
  << /Type /Catalog
     /Pages 2 0 R
  >>
endobj
2 0 obj
  << /Type /Pages
     /Kids [3 0 R]
     /Count 1
  >>
endobj
3 0 obj
  << /Type /Page
     /Parent 2 0 R
     /MediaBox [0 0 300 144]
     /Contents 4 0 R
  >>
endobj
4 0 obj
  << /Length 45 >>
stream
BT
/F1 24 Tf
100 100 Td
(dummy.pdf) Tj
ET
endstream
endobj
5 0 obj
  << /Type /Font
     /Subtype /Type1
     /BaseFont /Helvetica
  >>
endobj
6 0 obj
  << /Type /FontDescriptor
     /FontName /Helvetica
  >>
endobj
7 0 obj
  << /Type /Resources
     /Font << /F1 5 0 R >>
  >>
endobj
xref
0 8
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000111 00000 n 
0000000202 00000 n 
0000000290 00000 n 
0000000339 00000 n 
0000000382 00000 n 
trailer
  << /Root 1 0 R
     /Size 8
  >>
startxref
423
%%EOF
`;

export const dummyPdfBuffer = Buffer.from(dummyPdfString, 'utf-8');
