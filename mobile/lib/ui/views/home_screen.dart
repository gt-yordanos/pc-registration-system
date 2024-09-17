import 'package:flutter/material.dart';
import 'package:pc_registration_system/ui/views/login_screen.dart';
import 'registration_screen.dart';
import 'update_screen.dart';
import 'verify_screen.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF000F1F),
      appBar: AppBar(
        backgroundColor: Color(0xFF005F8F),
        title: Text(
          'PC Registration System',
          style: TextStyle(
            fontSize: 24.0,
            fontWeight: FontWeight.bold,
            color: Color(0xFFCCFFFF),
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(
              Icons.logout,
              color: Color(0xFFCCFFFF),
            ),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => LoginScreen()),
              );
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            RegistrationScreen(),
                      ),
                    );
                  },
                  child: SizedBox(
                    width: 180,
                    child: Card(
                      color: Color(0xFF001F3D),
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          children: [
                            Icon(Icons.person_add_alt_1,
                                color: Color(0xFF005F8F), size: 40),
                            SizedBox(height: 8.0),
                            Text(
                              'Registration',
                              style: TextStyle(
                                  color: Color(0xFFCCFFFF), fontSize: 18.0),
                            ),
                            SizedBox(height: 4.0),
                            Text(
                              'Register a new PC \n owner',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  color: Color(0xFFCCFFFF), fontSize: 12.0),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            UpdateScreen(),
                      ),
                    );
                  },
                  child: SizedBox(
                    width: 180,
                    child: Card(
                      color: Color(0xFF001F3D),
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          children: [
                            Icon(Icons.edit_document,
                                color: Color(0xFF005F8F), size: 40),
                            SizedBox(height: 8.0),
                            Text(
                              'Update',
                              style: TextStyle(
                                  color: Color(0xFFCCFFFF), fontSize: 18.0),
                            ),
                            SizedBox(height: 4.0),
                            Text(
                              "Update PC owner's \n information",
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  color: Color(0xFFCCFFFF), fontSize: 12.0),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 10.0),
            GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) =>
                        VerifyScreen(),
                  ),
                );
              },
              child: SizedBox(
                width: 180,
                child: Card(
                  color: Color(0xFF001F3D),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Icon(Icons.check, color: Color(0xFF005F8F), size: 40),
                        SizedBox(height: 8.0),
                        Text(
                          'Verify',
                          style: TextStyle(
                              color: Color(0xFFCCFFFF), fontSize: 18.0),
                        ),
                        SizedBox(height: 4.0),
                        Text(
                          'Verify the ownership \n of the PC',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              color: Color(0xFFCCFFFF), fontSize: 12.0),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
