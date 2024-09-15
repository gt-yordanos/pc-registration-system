import 'package:flutter/material.dart';
import 'home_screen.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();

  void _login() {
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => HomeScreen()),);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF000F1F), // Updated background color
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Center(
              child: Text(
                'PC Registration',
                style: TextStyle(
                  fontSize: 32.0,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFCCFFFF), // Updated text color
                ),
              ),
            ),
            Center(
              child: Text(
                'System',
                style: TextStyle(
                  fontSize: 32.0,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFCCFFFF), // Updated text color
                ),
              ),
            ),
            SizedBox(height: 40.0), // Space between title and fields
            Text(
              'Username',
              style: TextStyle(
                fontSize: 16.0,
                color: Color(0xFFCCFFFF), // Updated text color
              ),
            ),
            TextField(
              controller: _usernameController,
              decoration: InputDecoration(
                hintText: 'Enter your username',
                hintStyle: TextStyle(fontSize: 14.0,color: Color(0xFF759C9C)), // Updated hint text color
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFF005F8F)), // Updated enabled border color
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFFCCFFFF)), // Updated focused border color
                ),
              ),
              style: TextStyle(color: Color(0xFFCCFFFF)), // Updated input text color
            ),
            SizedBox(height: 20.0), // Space between username and password
            Text(
              'Password',
              style: TextStyle(
                fontSize: 16.0,
                color: Color(0xFFCCFFFF), // Updated text color
              ),
            ),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(
                hintText: 'Enter your password',
                hintStyle: TextStyle(fontSize: 14.0, color: Color(0xFF759C9C)), // Updated hint text color
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFF005F8F)), // Updated enabled border color
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Color(0xFFCCFFFF)), // Updated focused border color
                ),
              ),
              obscureText: true,
              style: TextStyle(color: Color(0xFFCCFFFF)), // Updated input text color
            ),
            SizedBox(height: 30.0), // Space between fields and button
            ElevatedButton(
              onPressed: _login,
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF005F8F), // Updated button color
                padding: EdgeInsets.symmetric(vertical: 16.0),
              ),
              child: Text(
                'Login',
                style: TextStyle(fontSize: 18.0, color: Color(0xFFCCFFFF)), // Updated button text color
              ),
            ),
          ],
        ),
      ),
    );
  }
}
