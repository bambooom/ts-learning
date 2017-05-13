import * as React from 'react';

class SearchBar extends React.Component<{}, null> {
    render() {
        return (
            <div className="has-icon-right search-bar-container">
                <input
                    disabled={true}
                    type="text"
                    className="form-input input-sm"
                    placeholder="搜索股票代码(暂未开启)" />
                <i className="form-icon icon icon-search" />
            </div>
        );
    }
}

export default SearchBar;