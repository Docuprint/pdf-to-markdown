import { Enum } from 'enumify';

import CalculateGlobalStats from './transformations/CalculateGlobalStats.jsx';
import CompactLines from './transformations/CompactLines.jsx';
import RemoveRepetitiveElements from './transformations/RemoveRepetitiveElements.jsx'
import VerticalToHorizontal from './transformations/VerticalToHorizontal.jsx';
import DetectTOC from './transformations/DetectTOC.jsx'

import GatherBlocks from './transformations/GatherBlocks.jsx'
import DetectFootnotes from './transformations/DetectFootnotes.jsx'
import DetectLists from './transformations/DetectLists.jsx'
import DetectCodeBlocks from './transformations/DetectCodeBlocks.jsx'
import DetectHeadlines from './transformations/DetectHeadlines.jsx'
// import DetectFormats from './transformations/DetectFormats.jsx'
// import CombineSameY from './transformations/CombineSameY.jsx';
// import RemoveWhitespaces from './transformations/RemoveWhitespaces.jsx'
// import DetectLinks from './transformations/DetectLinks.jsx'
// import HeadlineDetector from './transformations/HeadlineDetector.jsx'
// import HeadlineToUppercase from './transformations/HeadlineToUppercase.jsx'
// import ToBlockSystem from './transformations/ToBlockSystem.jsx';
import ToTextBlocks from './transformations/ToTextBlocks.jsx';
import ToMarkdown from './transformations/ToMarkdown.jsx'

// Holds the state of the Application
export default class AppState {

    constructor(options) {
        this.renderFunction = options.renderFunction;
        this.mainView = View.UPLOAD;
        this.fileBuffer;
        this.pages = [];
        this.transformations = [
            new CalculateGlobalStats(),
            new CompactLines(),
            new RemoveRepetitiveElements(),
            new VerticalToHorizontal(),
            new DetectTOC(),

            new GatherBlocks(),
            new DetectFootnotes(),
            new DetectLists(),
            new DetectCodeBlocks(),
            new DetectHeadlines(),

            // new DetectFormats(),
            // new CombineSameY(),
            // new RemoveWhitespaces(),
            // new DetectLinks(),
            // new HeadlineDetector(),
            // new HeadlineToUppercase(),
            // new ToBlockSystem(),
            new ToTextBlocks(),
            new ToMarkdown()];

        //bind functions
        this.render = this.render.bind(this);
        this.storeFileBuffer = this.storeFileBuffer.bind(this);
        this.storePdfPages = this.storePdfPages.bind(this);
        this.switchMainView = this.switchMainView.bind(this);
    }

    render() {
        this.renderFunction(this)
    }

    // the uploaded pdf as file buffer
    storeFileBuffer(fileBuffer:ArrayBuffer) {
        this.fileBuffer = fileBuffer;
        this.mainView = View.LOADING;
        this.render()
    }

    storePdfPages(pages) {
        this.pages = pages;
        this.fileBuffer = null;
        this.mainView = View.RESULT;
        this.render();
    }

    switchMainView(view) {
        this.mainView = view;
        this.render();
    }

}

export class View extends Enum {
}
View.initEnum(['UPLOAD', 'LOADING', 'RESULT', 'DEBUG'])