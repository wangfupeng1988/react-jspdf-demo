import { RefObject, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
// import { jsPDF } from 'jspdf'
// import './SourceHanSans-VF-normal.js'

async function loadScript(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

interface ExportPDFProps {
  contentRef: RefObject<HTMLDivElement>
}

function ExportPDF(props: ExportPDFProps) {
  const { contentRef } = props

  const exportFn = debounce(() => {
    console.log('exportFn...')
    const contentElem = contentRef.current
    if (!contentElem) return

    const curFontFamily = contentElem.style.fontFamily
    contentElem.style.fontFamily = `'SourceHanSans-VF'` // set font-family

    // @ts-expect-error eslint-disable-line
    const doc = new window.jspdf.jsPDF()
    doc.setFont('SourceHanSans-VF')
    doc.html(contentElem, {
      // @ts-expect-error eslint-disable-line
      callback: function (doc) {
        doc.save('sample-document.pdf')
        contentElem.style.fontFamily = curFontFamily // reset font-family
      },
      x: 15,
      y: 10,
      width: 180, // target width in the PDF document
      windowWidth: 800, // window width in CSS pixels
    })
  }, 2000)

  const [loadingScript, setLoadingScript] = useState(true)

  async function loadScripts() {
    try {
      await loadScript(
        'https://unpkg.com/html2canvas@latest/dist/html2canvas.min.js'
      )
      console.log('html2canvas.js loaded')

      await loadScript('https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js')
      console.log('jsPDF.js loaded')

      await loadScript(
        'https://file-dev.huashuiai.com/static-home/SourceHanSans-VF-normal.js'
      )
      console.log('SourceHanSans-VF-normal.js loaded')

      setLoadingScript(false)
      exportFn()
    } catch (error) {
      console.error('loadScripts error:', error)
    }
  }

  useEffect(() => {
    console.log('ExportPDF mounted')
    loadScripts()

    // // load html2canvas js file
    // const script0 = document.createElement('script')
    // script0.src = 'https://unpkg.com/html2canvas@latest/dist/html2canvas.min.js'
    // script0.async = true
    // document.body.appendChild(script0)
    // script0.onload = () => {
    //   console.log('html2canvas.js loaded')

    //   // load jsPDF js file
    //   const script1 = document.createElement('script')
    //   script1.src = 'https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js'
    //   script1.async = true
    //   document.body.appendChild(script1)
    //   script1.onload = () => {
    //     console.log('jsPDF.js loaded')

    //     // load font js file
    //     const script2 = document.createElement('script')
    //     script2.src =
    //       'https://file-dev.huashuiai.com/static-home/SourceHanSans-VF-normal.js'
    //     script2.async = true
    //     document.body.appendChild(script2)
    //     script2.onload = () => {
    //       console.log('SourceHanSans-VF-normal.js loaded')
    //       setLoadingScript(false)
    //       exportFn()
    //     }
    //     script2.onerror = () => {
    //       console.error('SourceHanSans-VF-normal.js load failed')
    //     }
    //   }
    //   script1.onerror = () => {
    //     console.error('jsPDF.js load failed')
    //   }
    // }
    // script0.onerror = () => {
    //   console.error('html2canvas.js load failed')
    // }
  })

  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: '10px',
      }}
    >
      {loadingScript && <p>Loading script...</p>}
      {!loadingScript && (
        <button onClick={exportFn}>
          If did't download the PDF file, click here.
        </button>
      )}
    </div>
  )
}

export default ExportPDF
