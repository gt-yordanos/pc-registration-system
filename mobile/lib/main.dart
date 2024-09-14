import 'package:flutter/material.dart';

void main() {
  runApp(PCRegistrationSystemApp());
}

class PCRegistrationSystemApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PC Registration System',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('PC Registration System'),
      ),
      body: Center(
        child: Text(
          'Welcome to the PC Registration System!',
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
