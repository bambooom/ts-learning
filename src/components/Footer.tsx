import * as React from 'react';

class Footer extends React.Component<{}, null> {
    render() {
        return (
            <footer className="bg-gray">
                <section className="grid-footer container grid-960">
                    <p>
                        <a href="https://github.com/bambooom/ts-learning" target="_blank">
                            GitHub Repo
                        </a>
                        &nbsp;|&nbsp;
                        <a href="https://www.typescriptlang.org/" target="_blank">
                            TypeScript
                        </a>
                        &nbsp;|&nbsp;
                        <a href="https://github.com/facebook/react" target="_blank">
                            React
                        </a>
                        &nbsp;|&nbsp;
                        <a href="https://picturepan2.github.io/spectre/" target="_blank">
                            Spectre.css
                        </a>
                    </p>
                </section>
            </footer>
        );
    }
}

export default Footer;