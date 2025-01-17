import { useRef, Suspense, useState, lazy } from 'react'

const ExportPDF = lazy(() => import('./ExportPDF'))

function Loading() {
  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: '10px',
      }}
    >
      loading
    </div>
  )
}

function App() {
  const divRef = useRef<HTMLDivElement>(null)
  const [showExportPDF, setShowExportPDF] = useState(false)

  return (
    <>
      <div
        ref={divRef}
        style={{
          width: '800px',
          margin: '20px auto',
          // fontFamily: `'SourceHanSans-VF'`,
        }}
      >
        <h1>React jsPDF demo</h1>
        <h2 style={{ color: 'red' }}>title2, title2</h2>
        <h2>标题2, 标题2</h2>
        <p>
          段落1<span style={{ fontWeight: 'bold' }}>段落1</span>段落1
          <b>段落1</b>段落1
        </p>
        <p>
          段落2<span style={{ fontStyle: 'italic' }}>段落2</span>段落2
          <i>段落2</i>段落2
        </p>
        <p>
          This is plaint text. This is <a href="#">plaint</a> text.
        </p>
        <table style={{ border: '1px solid #ccc', width: '100%' }}>
          <tbody>
            <tr style={{ background: 'gray' }}>
              <td>A</td>
              <td>B</td>
              <td>C</td>
            </tr>
            <tr>
              <td>你</td>
              <td>我</td>
              <td>他</td>
            </tr>
          </tbody>
        </table>
        {/* <p style={{ textAlign: 'center' }}>
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            style={{ maxWidth: '100%' }}
          />
        </p> */}
      </div>
      <div
        style={{
          textAlign: 'center',
          borderTop: '1px solid #ccc',
          paddingTop: '10px',
        }}
      >
        <button onClick={() => setShowExportPDF(!showExportPDF)}>
          {showExportPDF ? 'Close' : 'Export PDF'}
        </button>
      </div>

      {showExportPDF && (
        <Suspense fallback={<Loading />}>
          <ExportPDF contentRef={divRef} />
        </Suspense>
      )}
    </>
  )
}

export default App
