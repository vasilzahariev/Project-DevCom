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
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import TextFieldsIcon from '@material-ui/icons/TextFields';

const SpecialTextArea = (props) => {
    const articleContext = useContext(ArticleContext);

    const [iFrameNode, setIFrameNode] = useState(null);

    const onCmd = (e, cmd) => {
        e.preventDefault();

        iFrameNode.contentWindow.document.execCommand(cmd);

        const body = iFrameNode.contentWindow.document.body.innerHTML;

        props.updateBody(body);
    }

    const onCmdWithWindow = (e, cmd) => {
        e.preventDefault();

        const linkVal = prompt('Please enter link:', '');

        if (linkVal == null || linkVal == '')
            return;
        else
            iFrameNode.contentWindow.document.execCommand(cmd, false, linkVal);
        
        const body = iFrameNode.contentWindow.document.body.innerHTML;

        props.updateBody(body);
    }

    const updateBody = e => {
        e.preventDefault();

        const body = document.getElementsByTagName('iframe')[0].contentWindow.document.body.innerHTML;

        props.updateBody(body);
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
                        <button title='Bold' onClick={e => onCmd(e, 'bold')}><FormatBoldIcon /></button>
                        <button title='Italic' onClick={e => onCmd(e, 'italic')}><FormatItalicIcon /></button>
                        <button title='Underline' onClick={e => onCmd(e, 'underline')}><FormatUnderlinedIcon /></button>
                        <button title='Strikethrough' onClick={e => onCmd(e, 'strikethrough')}><StrikethroughSIcon /></button>
                        <button title='Link' onClick={e => onCmdWithWindow(e, 'createLink')}><LinkIcon /></button>
                        <button title='Unlink' onClick={e => onCmd(e, 'unlink')}><LinkOffIcon /></button>
                        <button title='Font Size' onClick={e => onCmdWithWindow(e, 'fontSize')}><TextFieldsIcon /></button>
                        <button title='Justify Left' onClick={e => onCmd(e, 'justifyLeft')}><FormatAlignLeftIcon /></button>
                        <button title='Justify Center' onClick={e => onCmd(e, 'justifyCenter')}><FormatAlignCenterIcon /></button>
                        <button title='Justify Right' onClick={e => onCmd(e, 'justifyRight')}><FormatAlignRightIcon /></button>
                        <button title='Justify Full' onClick={e => onCmd(e, 'justifyFull')}><FormatAlignJustifyIcon /></button>
                        <button title='Insert Ordered List' onClick={e => onCmd(e, 'insertOrderedList')}><FormatListNumberedIcon /></button>
                        <button title='Insert Unordered List' onClick={e => onCmd(e, 'insertUnorderedList')}><FormatListBulletedIcon /></button>
                        <button title='Insert Paragraph' onClick={e => onCmd(e, 'insertParagraph')}><FormatTextdirectionRToLIcon /></button>
                        <button title='Indent' onClick={e => onCmd(e, 'indent')}><FormatIndentIncreaseIcon /></button>
                        <button title='Outdent' onClick={e => onCmd(e, 'outdent')}><FormatIndentDecreaseIcon /></button>
                        <button title='Undo' onClick={e => onCmd(e, 'undo')}><UndoIcon /></button>
                        <button title='Redo' onClick={e => onCmd(e, 'redo')}><RedoIcon /></button>
                    </div>

                    <iframe className={styles.iframe}></iframe>
                </div>
            </div>
        </div>
    );
}

export default SpecialTextArea;
