const JOB_TITLE_CLASS_NAME = 'job-title';
const JOB_TITLES = document.getElementsByClassName(JOB_TITLE_CLASS_NAME);
const MOUSE_EVENTS = ['mouseenter', 'mouseleave', 'click'];

let jobTitleMap = new Map();


for (const jobTitle of JOB_TITLES) {
    jobTitleMap.set(jobTitle, jobTitle.closest('li').querySelector('.display-none'));
    MOUSE_EVENTS.forEach(mouseEvent =>
        jobTitle.addEventListener(mouseEvent, (event) => {
            handleJobTitleTooltip(event.target, mouseEvent);
        })
    )
}

function handleJobTitleTooltip(jobTitle, mouseEvent) {

    if (mouseEvent === 'click') {
        const styles = getComputedStyle(jobTitle);
        const content = styles.getPropertyValue('--tooltip-content');
        if (content === '"expand"') {
            jobTitle.style.setProperty('--tooltip-content', '"hide"');
            handleJobTitleExpansion(jobTitle, true);
        } else {
            jobTitle.style.setProperty('--tooltip-content', '"expand"');
            handleJobTitleExpansion(jobTitle, false);
        }
        return
    }

    if (mouseEvent === 'mouseenter') {
        jobTitle.style.setProperty('--tooltip-opacity', 1);
        jobTitle.style.setProperty('--tooltip-visibility', 'visible');
        return
    }

    if (mouseEvent === 'mouseleave') {
        jobTitle.style.setProperty('--tooltip-opacity', 0);
        jobTitle.style.setProperty('--tooltip-visibility', 'hidden');
    }
}

function handleJobTitleExpansion(targetJobTitle, isExpanded) {
    for (const jobTitle of JOB_TITLES) {
        const jobDescription = jobTitleMap.get(jobTitle);
        if (jobTitle.isSameNode(targetJobTitle)) {
            if (isExpanded) {
                jobDescription.style.display = 'block';
            } else {
                jobDescription.style.display = 'none';
            }
        } else {
            jobDescription.style.display = 'none';
        }
    }
}