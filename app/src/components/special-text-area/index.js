import styles from './index.module.css';
import InputErrorMessage from '../input-error-message';
import { useState, useEffect, useContext } from 'react';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import FormatTextdirectionRToLIcon from '@material-ui/icons/FormatTextdirectionRToL';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import ArticleContext from '../../contexts/ArticleContext';

const SpecialTextArea = (props) => {
    const articleContext = useContext(ArticleContext);

    const [iFrameNode, setIFrameNode] = useState(null);

    const onCmd = (e, cmd) => {
        e.preventDefault();

        iFrameNode.contentWindow.document.execCommand(cmd);

        const body = iFrameNode.contentWindow.document.body.innerHTML;

        articleContext.article.content = body;
    }

    const updateBody = e => {
        e.preventDefault();

        const body = document.getElementsByTagName('iframe')[0].contentWindow.document.body.innerHTML;

        articleContext.article.content = body;
    }

    useEffect(() => {
        const iFrame = document.getElementsByTagName('iframe')[0];

        iFrame.contentWindow.document.designMode = 'on';
        iFrame.contentWindow.document.body.innerHTML = props.value;
        iFrame.contentWindow.document.addEventListener('keyup', updateBody);
        iFrame.contentWindow.document.body.style.color = 'white';
        iFrame.contentWindow.document.body.style.fontSize = '1.3rem';
        iFrame.contentWindow.document.body.style.fontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;

        setIFrameNode(iFrame);
    }, []);

    return (
        <div className={styles.area}>
            <p>{props.label}</p>
            <div>
                <div className={styles.block}>
                    <div className={styles.btns}>
                        <button onClick={e => onCmd(e, 'bold')}><FormatBoldIcon /></button>
                        <button onClick={e => onCmd(e, 'italic')}><FormatItalicIcon /></button>
                        <button onClick={e => onCmd(e, 'underline')}><FormatUnderlinedIcon /></button>
                        <button onClick={e => onCmd(e, 'strikethrough')}><StrikethroughSIcon /></button>
                        <button onClick={e => onCmd(e, 'justifyLeft')}><FormatAlignLeftIcon /></button>
                        <button onClick={e => onCmd(e, 'justifyFull')}><FormatAlignJustifyIcon /></button>
                        <button onClick={e => onCmd(e, 'justifyRight')}><FormatAlignRightIcon /></button>
                        <button onClick={e => onCmd(e, 'insertParagraph')}><FormatTextdirectionRToLIcon /></button>
                        <button onClick={e => onCmd(e, 'indent')}><FormatIndentIncreaseIcon /></button>
                        <button onClick={e => onCmd(e, 'outdent')}><FormatIndentDecreaseIcon /></button>
                        <button onClick={e => onCmd(e, 'undo')}><UndoIcon /></button>
                        <button onClick={e => onCmd(e, 'redo')}><RedoIcon /></button>
                    </div>

                    <iframe className={styles.iframe}></iframe>
                </div>
            </div>
        </div>
    );
}

export default SpecialTextArea;
