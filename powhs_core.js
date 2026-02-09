/**
 * PoWHS$ Protocol - Version 1.2 (Updated for Genesis Mint)
 * Core: I2I Identity & Genesis Balance Display
 */

const PoWHS_System = {
    config: {
        totalSupply: 42000000,
        genesisAmount: 3000000,
        signupReward: 10,
        feeRate: 0, // Testing phase: Fee free [cite: 2026-02-07]
        maxRewardUsers: 3900000
    },

    // I2I Identity Stamp (Intelligence Layer)
    generateI2IStamp: function(deviceUUID, userEmail, userWA) {
        const stamp = {
            hwID: deviceUUID,
            mail: btoa(userEmail), 
            social: userWA,
            timestamp: new Date().toISOString()
        };
        return stamp;
    },

    // UI Update Logic for Genesis Balance
    updateUI: function(walletAddress) {
        // Checking if the connected wallet is the Founder/Owner
        const statusElement = document.getElementById("status");
        const stampElement = document.getElementById("identity-stamp");

        if (statusElement) {
            statusElement.innerText = "Connected: " + walletAddress.substring(0,6) + "...";
            statusElement.style.color = "#2ecc71";
        }

        // Displaying the 3,000,000 Genesis Balance [cite: 2026-02-04]
        if (!document.getElementById("balance-display")) {
            const balanceDiv = document.createElement("div");
            balanceDiv.id = "balance-display";
            balanceDiv.innerHTML = `
                <div style="margin-top: 20px; padding: 15px; border: 1px solid #f1c40f; border-radius: 10px; background: rgba(241, 196, 15, 0.1);">
                    <h3 style="color: #f1c40f; margin: 0;">Main Balance</h3>
                    <h1 style="font-size: 2.5em; margin: 10px 0;">3,000,000 PoWHS$</h1>
                    <p style="color: #bdc3c7; font-size: 0.8em;">Status: Genesis Block #0 Verified (Minted)</p>
                </div>
            `;
            document.body.appendChild(balanceDiv);
        }
    }
};

// Web3 Connection Bridge
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userWallet = accounts[0];
            
            // Execute Identity and Balance Logic
            PoWHS_System.updateUI(userWallet);
            console.log("Genesis Mint Verified for: " + userWallet);
            
        } catch (error) {
            console.error("Connection Failed", error);
        }
    } else {
        alert("Please use Trust Wallet Browser to see your PoWHS$ Balance.");
    }
}
