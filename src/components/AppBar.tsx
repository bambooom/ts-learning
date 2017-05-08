import * as React from 'react';

class AppBar extends React.Component<{}, null> {
    render() {
        return (
            <section className="section section-header bg-gray">
                <section className="grid-header container grid-960">
                    <nav className="navbar">
                        <section className="navbar-section">
                            <a href="#" className="navbar-brand mr-10">Typescript Trading Demo</a>
                        </section>
                        <section className="navbar-section">
                            <a href="https://github.com/bambooom/ts-learning" 
                               target="_blank" className="btn btn-primary">
                                GitHub
                            </a>
                        </section>
                    </nav>
                </section>
            </section>
        );
    }
}

export default AppBar;