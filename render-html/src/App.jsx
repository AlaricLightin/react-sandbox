import './App.css'
import { Markup } from 'react-render-markup'
import Popup from 'reactjs-popup'
import { useState } from 'react'

function App() {
    const DetailsPopup = ({ summary, details }) => {
        const [open, setOpen] = useState(false);
        const closeModal = () => setOpen(false);
        return (
            <>
                <Popup
                    open={open} closeOnDocumentClick onClose={closeModal}
                    trigger={
                        <span className="details" onClick={() => setOpen(o => !o)}>
                            {summary}
                        </span>
                    }
                >
                    <div className="modal popup-window">
                        {details}
                    </div>
                </Popup>
            </>
        );
    };

    const allowed = ['br', 'details', 'summary']
    const replace = {
        details: ({ children }) => {
            const summaryIdx = children.findIndex((child) => child.type === 'summary')
            if (summaryIdx < 0)
                return <DetailsPopup summary='*' details={children} />;
            else {
                const summary = children[summaryIdx].props.children;
                const details = children.filter((_, idx) => idx !== summaryIdx);
                return <DetailsPopup
                    summary={summary}
                    details={details} />;
            }
        }
    }
    
    const markup = `
    Some first line
    <br>
    <details><summary>Description</summary>Normal text</details> and something else<br>
    Some another line.
  `

    return (
        <>
            <h1>HTML render experiment: details and popup</h1>
            <Markup
                markup={markup}
                allowed={allowed}
                replace={replace}
            />
        </>
    )
}

export default App
