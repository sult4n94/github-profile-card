namespace GitHubCard {

    interface WidgetPublicAPI extends Window {
        GitHubCard: GitHubCardWidget;
    }

    (<WidgetPublicAPI> window).GitHubCard = GitHubCardWidget;

    document.addEventListener('DOMContentLoaded', () => {
        const widget = new GitHubCardWidget();
        widget.init();
    };
}