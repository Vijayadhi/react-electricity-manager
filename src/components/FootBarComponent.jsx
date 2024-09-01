import React from 'react';
import '../footer.css'; // Import the CSS file for styling

function FootBarComponent() {
    return (
        <footer className="footer">
                
                <div className="text-center">
                    <p>&copy; {new Date().getFullYear()} Brought to life by <a href='https://github.com/Vijayadhi'>Vijayadithyan</a>. All rights reserved.</p>
                </div>
        </footer>
    );
}

export default FootBarComponent;
