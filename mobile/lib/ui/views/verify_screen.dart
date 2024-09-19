import 'package:flutter/material.dart';

class VerifyScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF000F1F),
      appBar: AppBar(
        backgroundColor: Color(0xFF005F8F),
        title: Text(
          'Verify Ownership',
          style: TextStyle(
            fontSize: 24.0,
            fontWeight: FontWeight.bold,
            color: Color(0xFFCCFFFF),
          ),
        ),
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Color(0xFFCCFFFF)),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Text(
                'Enter the student\'s ID number\nor scan the QR Code to verify\nthe PC ownership',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Color(0xFFCCFFFF),
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 20.0),
              Container(
                width:290.0,
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        style: TextStyle(color: Color(0xFFCCFFFF)),
                        decoration: InputDecoration(
                          labelText: 'ID Number',
                          labelStyle: TextStyle(color: Color(0xFFCCFFFF)),
                          enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: Color(0xFF005F8F)),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: Color(0xFF005F8F)),
                          ),
                          hintText: 'Enter ID number',
                          hintStyle: TextStyle(color: Color(0xFFCCFFFF)),
                        ),
                      ),
                    ),
                    Container(
                      height: 56.0,
                      decoration: BoxDecoration(
                        border: Border.all(color: Color(0xFF005F8F), width: 2.0),
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      child: IconButton(
                        icon: Icon(Icons.search, color: Color(0xFF005F8F), ),
                        onPressed: () {
                          //Search action
                        },
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 20.0),
              Container(
                width: 290.0,
                height: 290.0,
                decoration: BoxDecoration(
                    color: Color(0xFF001F3D),
                    borderRadius: BorderRadius.circular(8.0),
                    border: Border.all(
                      color: Color(0xFF005F8F),
                      width: 2.0,
                    )
                ),
                child: Center(
                  child: Icon(
                    Icons.qr_code_scanner,
                    size: 240.0,
                    color: Color(0xFFCCFFFF),
                  ),
                ),
              ),
              SizedBox(height: 20.0),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF005F8F),
                  padding: EdgeInsets.symmetric(horizontal: 85.0, vertical: 15.0),
                ),
                onPressed: () {
                  // QR Code scanning functionality
                },
                child: Text(
                  'Scan QR Code',
                  style: TextStyle(color: Color(0xFFCCFFFF), fontSize: 18.0),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
