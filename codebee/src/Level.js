var unlockedLeLevels = ['1-1', '1-2', '2-1', '2-2']

class LevelFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allLevels: ['1-1', '1-2', '1-3', '2-1', '2-2'],
            unlockedLeLevels: unlockedLeLevels,
            selected: ""
        }
    }

    load() {
        var unlockedLeLevels = fetch('data')
        this.setState({ unlockedLeLevels: unlockedLeLevels})
    }

    isUnlocked() {
        return this.props.levelName in this.state.unlockedLeLevels;
    }

    select() {
        this.setState({ selected: this.props.levelName });
    }

    render() {
        load();
        var buttons;
        var i;
        for (i = 0; i < this.state.allLevels.length; i++) {
            buttons += <button onClick={this.select.bind(this)} disabled={!this.isUnlocked.bind(this)} levelName={this.state.allLevels[i]}>
                {this.props.levelName}
            </button>;
        }
        return (
            <div>
                {buttons}
            </div>
        );
    }
}

export default LevelFrame;