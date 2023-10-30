package com.wallet_templete;

import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class ArchivingModule extends ReactContextBaseJavaModule {
    ArchivingModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "ArchivingModule";
    }

    @ReactMethod
    public void Zip(String baseFilename, String sourcePath,Callback callback) {
        File externalFilesDir = getReactApplicationContext().getExternalFilesDir(null);

        if (externalFilesDir != null) {
            File archiveFile = new File("/storage/emulated/0/Download", baseFilename + ".mc");
            String path = TimeZip.zipToMC(getReactApplicationContext(), archiveFile.getAbsolutePath(), sourcePath);
            callback.invoke(externalFilesDir.getPath());
        } else {
            Toast.makeText(getReactApplicationContext(),"External files directory is null. Cannot create the ZIP file",Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void Unzip(String baseFileName, Callback callback){
        try{
            File externalFileDir = getReactApplicationContext().getExternalFilesDir(null);
            if(externalFileDir != null){
                TimeZip.unzipMC(getReactApplicationContext(), baseFileName,"/storage/emulated/0/Download");
            }
        }catch (Exception e){
            callback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public Uri realSource(String source){
        Uri contentUri = Uri.parse(source);
        String result = RealPathUtil.getRealPath(getReactApplicationContext(),contentUri);
        return Uri.parse(result);
    }

    @ReactMethod
    public void allFiles(Callback callback){
        String externalStorageDirectory = "/storage/emulated/0/Download";
        String extension = ".mc";
        List<String> mcFiles = TimeZip.listFilesWithExtension(externalStorageDirectory,extension);
        WritableArray writableArray = new WritableNativeArray();
        for(String mcFile:mcFiles){
            writableArray.pushString(mcFile);
        }
        callback.invoke(writableArray);
    }
}