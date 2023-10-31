// Made by t.me/btcez // Made by t.me/btcezx // Made by t.me/btcezx
// Made by t.me/btcezx // Made by t.me/btcezx // Made by t.me/btcezx
// Made by t.me/btcezx // Made by t.me/btcezx // Made by t.me/btcezx
// Made by t.me/btcez // Made by t.me/btcezx // Made by t.me/btcezx

const Discord = require('discord.js');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

// Your Discord bot token
const token = 'YOUR DISCORD TOKEN HERE';

// Your smm.lat API key
const smmLatApiKey = 'GRAB YOUR API SMM.LAT/DEVELOPER';

// The Discord ID of the bot owner
const botOwnerId = '957966264033239090';

// Open a database connection and create the 'balances' table if it doesn't exist
const db = new sqlite3.Database('balances.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    db.run(`
      CREATE TABLE IF NOT EXISTS balances (
        user_id TEXT PRIMARY KEY,
        balance REAL DEFAULT 0
      )
    `);
    console.log('Database connected and table created/verified.');
  }
});

// Create a new Discord client
const client = new Discord.Client();

// Ready event
client.once('ready', () => {
  console.log('Bot is ready!');
});

// Message event
client.on('message', async (message) => {
  if (message.author.bot || !message.content.startsWith('!igfollowers') && !message.content.startsWith('!ttfollowers') && !message.content.startsWith('!twfollowers') && !message.content.startsWith('!addbalance') && !message.content.startsWith('!removebalance') && !message.content.startsWith('!balance')) return;

  const args = message.content.split(' ');
  const command = args[0];

  // Check if the command is "!igfollowers"
  if (command === '!igfollowers') {
    const username = args[1];
    const quantity = parseInt(args[2]);

    // Check if the username and quantity are provided
    if (!username || isNaN(quantity) || quantity <= 0) {
      message.reply('Please provide a valid username and quantity. Usage: `!igfollowers <username> <quantity>`.');
      return;
    }

    // Check if the quantity is within the allowed range (20 to 2000)
    if (quantity < 20 || quantity > 2000) {
      message.reply('Invalid quantity. The number of followers should be between 20 and 2000.');
      return;
    }

    // Check if the user has enough balance
    const userBalance = await getBalance(message.author.id);
    const cost = quantity <= 1000 ? quantity * 0.6 / 1000 : Math.ceil(quantity / 1000) * 0.6;
    if (!userBalance || userBalance < cost) {
      message.reply('Insufficient balance. Please add more balance to place this order.');
      return;
    }

    // Deduct the required balance for the order
    const newBalance = userBalance - cost;
    await updateBalance(message.author.id, newBalance);

    // Make the HTTPS request to smm.lat API for Instagram followers
    const url = `https://smm.lat/api/v2?action=add&service=3060&link=instagram.com/${username}&quantity=${quantity}&key=${smmLatApiKey}`;
    try {
      const response = await axios.get(url);
      const result = response.data;

      // Log the API response
      console.log('API Response (Instagram Followers):', result);

      // Handle the response from the API and send appropriate messages
      if (result.order) {
        message.reply(`---------------------------------\n**✅ Order placed successfully!** \n\n:small_red_triangle_down: $${cost.toFixed(2)} were debited from your account \n💰 Your current balance is $${newBalance}. \n🔹 Service: INSTAGRAM FOLLOWERS`);
      } else if (result.error) {
        message.reply(`Error placing the order: ${result.error}`);
      } else {
        message.reply('Unknown error placing the order. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      message.reply('Error making the request. Please try again later.');
    }
  }
  // Check if the command is "!ttfollowers" (TikTok followers)
  else if (command === '!ttfollowers') {
    const username = args[1];
    const quantity = parseInt(args[2]);

    // Check if the username and quantity are provided
    if (!username || isNaN(quantity) || quantity <= 0) {
      message.reply('Please provide a valid username and quantity. Usage: `!ttfollowers <username> <quantity>`.');
      return;
    }

    // Check if the quantity is within the allowed range (10 to 500000)
    if (quantity < 10 || quantity > 500000) {
      message.reply('Invalid quantity. The number of followers should be between 10 and 500000.');
      return;
    }

    // Check if the user has enough balance
    const userBalance = await getBalance(message.author.id);
    const cost = quantity <= 1000 ? quantity * 2 / 1000 : Math.ceil(quantity / 1000) * 2;
    if (!userBalance || userBalance < cost) {
      message.reply('Insufficient balance. Please add more balance to place this order.');
      return;
    }

    // Deduct the required balance for the order
    const newBalance = userBalance - cost;
    await updateBalance(message.author.id, newBalance);

    // Make the HTTPS request to smm.lat API for TikTok followers
    const url = `https://smm.lat/api/v2?action=add&service=3062&link=tiktok.com/@${username}&quantity=${quantity}&key=${smmLatApiKey}`;
    try {
      const response = await axios.get(url);
      const result = response.data;

      // Log the API response
      console.log('API Response (TikTok Followers):', result);

      // Handle the response from the API and send appropriate messages
      if (result.order) {
        message.reply(`---------------------------------\n**✅ Order placed successfully!** \n\n:small_red_triangle_down: $${cost.toFixed(2)} were debited from your account \n💰 Your current balance is $${newBalance}. \n🔹 Service: TIKTOK FOLLOWERS`);
      } else if (result.error) {
        message.reply(`Error placing the order: ${result.error}`);
      } else {
        message.reply('Unknown error placing the order. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      message.reply('Error making the request. Please try again later.');
    }
  }
  // Check if the command is "!twfollowers" (Twitch followers)
  else if (command === '!twfollowers') {
    const username = args[1];
    const quantity = parseInt(args[2]);

    // Check if the username and quantity are provided
    if (!username || isNaN(quantity) || quantity <= 0) {
      message.reply('Please provide a valid username and quantity. Usage: `!twfollowers <username> <quantity>`.');
      return;
    }

    // Check if the quantity is within the allowed range (20 to 5000)
    if (quantity < 20 || quantity > 5000) {
      message.reply('Invalid quantity. The number of followers should be between 20 and 5000.');
      return;
    }

    // Check if the user has enough balance
    const userBalance = await getBalance(message.author.id);
    const cost = quantity <= 1000 ? quantity * 0.6 / 1000 : Math.ceil(quantity / 1000) * 0.6;
    if (!userBalance || userBalance < cost) {
      message.reply('Insufficient balance. Please add more balance to place this order.');
      return;
    }

    // Deduct the required balance for the order
    const newBalance = userBalance - cost;
    await updateBalance(message.author.id, newBalance);

    // Make the HTTPS request to smm.lat API for Twitch followers
    const url = `https://smm.lat/api/v2?action=add&service=3107&link=twitch.tv/${username}&quantity=${quantity}&key=${smmLatApiKey}`;
    try {
      const response = await axios.get(url);
      const result = response.data;

      // Log the API response
      console.log('API Response (Twitch Followers):', result);

      // Handle the response from the API and send appropriate messages
      if (result.order) {
        const user = message.author;
        message.reply(`---------------------------------\n**✅ Order placed successfully!** \n\n:small_red_triangle_down: $${cost.toFixed(2)} were debited from your account \n💰 Your current balance is $${newBalance}. \n🔹 Service: TWITCH FOLLOWERS`);
      } else if (result.error) {
        message.reply(`Error placing the order: ${result.error}`);
      } else {
        message.reply('Unknown error placing the order. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      message.reply('Error making the request. Please try again later.');
    }
  }
  // Check if the command is "!addbalance" (Bot owner can add balance to users)
  else if (command === '!addbalance' && message.author.id === botOwnerId) {
    const targetUserId = args[1];
    const amountToAdd = parseFloat(args[2]);

    // Check if the target user ID and amount are provided
    if (!targetUserId || isNaN(amountToAdd) || amountToAdd <= 0) {
      message.reply('Please provide a valid target user ID and amount to add. Usage: `!addbalance <targetUserID> <amount>`.');
      return;
    }

    // Update the balance for the target user
    const targetUserBalance = await getBalance(targetUserId);
    const newBalance = targetUserBalance + amountToAdd;
    await updateBalance(targetUserId, newBalance);

    message.reply(`Balance of user with ID ${targetUserId} updated successfully. New balance: ${newBalance}.`);
  }
  // Check if the command is "!removebalance" (Bot owner can remove balance from users)
  else if (command === '!removebalance' && message.author.id === botOwnerId) {
    const targetUserId = args[1];
    const amountToRemove = parseFloat(args[2]);

    // Check if the target user ID and amount are provided
    if (!targetUserId || isNaN(amountToRemove) || amountToRemove <= 0) {
      message.reply('Please provide a valid target user ID and amount to remove. Usage: `!removebalance <targetUserID> <amount>`.');
      return;
    }

    // Update the balance for the target user
    const targetUserBalance = await getBalance(targetUserId);
    const newBalance = Math.max(targetUserBalance - amountToRemove, 0);
    await updateBalance(targetUserId, newBalance);

    message.reply(`Balance of user with ID ${targetUserId} updated successfully. New balance: ${newBalance}.`);
  }
  // Check if the command is "!balance" (Check user's balance)
  else if (command === '!balance') {
    const userBalance = await getBalance(message.author.id);
    message.reply(`Your current balance is: $${userBalance}`);
  }
});

// Log in to Discord
client.login(token);

// Helper functions to interact with the database
function getBalance(userId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT balance FROM balances WHERE user_id = ?', [userId], (err, row) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(row ? row.balance : 0);
      }
    });
  });
}

function updateBalance(userId, newBalance) {
  return new Promise((resolve, reject) => {
    db.run('INSERT OR REPLACE INTO balances (user_id, balance) VALUES (?, ?)', [userId, newBalance], (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
